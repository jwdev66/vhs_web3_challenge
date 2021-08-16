import { useMemo } from "react";
import {
  Header,
  Container,
  Table,
  TBody,
  TR,
  TH,
  TD,
  BackButton,
} from "components/styled";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { utils } from "ethers";

const TransactionDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const transaction = useMemo(() => {
    if (location.state && location.state.transaction) {
      return location.state.transaction;
    }
    return [];
  }, [location.state]);

  return (
    <Container>
      <Header>Transaction Detail</Header>
      <BackButton onClick={() => history.goBack()}>{"< Back"}</BackButton>
      <Table>
        <TBody>
          <TR>
            <TH>Index</TH>
            <TD>{transaction.transactionIndex}</TD>
          </TR>
          <TR>
            <TH>From</TH>
            <TD>{transaction.from}</TD>
          </TR>
          <TR>
            <TH>To</TH>
            <TD>{transaction.to}</TD>
          </TR>
          <TR>
            <TH>Amount</TH>
            <TD>{utils.formatUnits(transaction.value, "ether")}</TD>
          </TR>
          <TR>
            <TH>Gas</TH>
            <TD>{transaction.gas}</TD>
          </TR>
          <TR>
            <TH>Gas Price</TH>
            <TD>{utils.formatUnits(transaction.gasPrice, "ether")}</TD>
          </TR>
          <TR>
            <TH>Type</TH>
            <TD>{transaction.type}</TD>
          </TR>
          <TR>
            <TH>MaxFeePerGas</TH>
            <TD>{transaction.maxFeePerGas}</TD>
          </TR>
          <TR>
            <TH>MaxPriorityFeePerGas</TH>
            <TD>{transaction.maxPriorityFeePerGas}</TD>
          </TR>
        </TBody>
      </Table>
    </Container>
  );
};

export default TransactionDetail;
