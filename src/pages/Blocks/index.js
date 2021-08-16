import { useState, useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useAuth from "hooks/useAuth";
import useWeb3Instance from "hooks/useWeb3Instance";
import range from "lodash.range";
import moment from "moment";
import {
  Header,
  ConnectButton,
  Container,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Message,
} from "components/styled";
import { useHistory } from "react-router";
import { BigNumber } from "ethers";

const PollingInterval = 5000;

const Blocks = () => {
  const [didMount, setDidMount] = useState(false);
  const [latestBlockNumber, setLatestBlockNumber] = useState(0);
  const [latestBlocks, setLatestBlocks] = useState([]);
  const { login } = useAuth();
  const web3 = useWeb3React();
  const web3Instance = useWeb3Instance();
  const history = useHistory();

  const getLatestBlockNumber = useCallback(() => {
    web3Instance.eth.getBlockNumber().then((blockNumber) => {
      setLatestBlockNumber(blockNumber);
    });
  }, [web3Instance.eth]);

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  useEffect(() => {
    getLatestBlockNumber();
    setInterval(function () {
      getLatestBlockNumber();
    }, PollingInterval);
  }, [getLatestBlockNumber]);

  const getLatestTenblocks = useCallback(async () => {
    if (latestBlockNumber) {
      const blockNumbers = range(
        latestBlockNumber - 9,
        latestBlockNumber + 1,
        1
      );
      const blocks = [];

      const promises = blockNumbers.map((blockNumber) => {
        return web3Instance.eth.getBlock(blockNumber, true, (err, res) => {
          if (!err) blocks.push(res);
        });
      });

      await Promise.all(promises)
        .then(() => {
          if (didMount)
            setLatestBlocks(blocks.sort((a, b) => b.timestamp - a.timestamp));
        })
        .catch((err) => console.log("error=", err));
    }
  }, [latestBlockNumber, web3Instance.eth, didMount]);

  useEffect(() => {
    getLatestTenblocks();
  }, [getLatestTenblocks]);

  const handleBlockClick = useCallback(
    (block) => {
      const sendingEtherTransactions = block.transactions.filter(
        (transaction) => BigNumber.from(transaction.value).gt(0)
      );
      history.push({
        pathname: `/blocks/${block.number}/transactions`,
        state: { transactions: sendingEtherTransactions },
      });
    },
    [history]
  );

  return (
    <Container>
      <Header>Latest 10 Blocks</Header>
      <ConnectButton type="button" onClick={login}>
        {web3.active
          ? `${web3.account.substring(0, 7)}...${web3.account.substring(
              web3.account.length - 5
            )}`
          : "Connect"}
      </ConnectButton>
      <Table>
        <THead>
          <TR>
            <TH>Block Number</TH>
            <TH>DateTime</TH>
            <TH>Miner</TH>
            <TH>Transaction Count</TH>
            <TH>GasUsed</TH>
            <TH>GasLimit</TH>
          </TR>
        </THead>
        <TBody>
          {latestBlocks.map((block) => (
            <TR key={block.number} onClick={() => handleBlockClick(block)}>
              <TD>{block.number}</TD>
              <TD>
                {moment(block.timestamp * 1000).format("MM/DD/YYYY hh:mm:ss")}
              </TD>
              <TD>{block.miner}</TD>
              <TD>{block.transactions.length}</TD>
              <TD>{block.gasUsed}</TD>
              <TD>{block.gasLimit}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
      {latestBlocks.length === 0 && <Message>Getting Latest Blocks...</Message>}
    </Container>
  );
};

export default Blocks;
