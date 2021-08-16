import { useState, useRef, useCallback, useMemo } from "react";
import {
  Header,
  Container,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  BackButton,
  FlexRow,
  Input,
  Form,
} from "components/styled";
import { useLocation, useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { utils } from "ethers";

const Transactions = () => {
  const [addressQuery, setAddressQuery] = useState("");
  const [amountQuery, setAmountQuery] = useState(0);
  const addressRef = useRef(null);
  const amountRef = useRef(null);
  const location = useLocation();
  const params = useParams();
  const history = useHistory();
  const transactions = useMemo(() => {
    if (location.state && location.state.transactions) {
      if (!addressQuery && !amountQuery) {
        return location.state.transactions;
      } else {
        return location.state.transactions.filter(
          (transaction) =>
            (addressQuery &&
              (transaction.from === addressQuery ||
                transaction.to === addressQuery)) ||
            (amountQuery &&
              utils.formatUnits(transaction.value, "ether") ===
                `${amountQuery}`)
        );
      }
    }
    return [];
  }, [location.state, addressQuery, amountQuery]);

  const handleTransactionClick = useCallback(
    (transaction) => {
      history.push({
        pathname: `/blocks/${transaction.blockNumber}/transactions/${transaction.transactionIndex}`,
        state: { transaction: transaction },
      });
    },
    [history]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setAddressQuery(addressRef.current.value);
    setAmountQuery(amountRef.current.value);
  };

  return (
    <Container>
      <Header>Block #{params.number} Transactions</Header>
      <FlexRow>
        <BackButton onClick={() => history.goBack()}>{"< Back"}</BackButton>
        <Form onSubmit={handleSearch}>
          <Input type="text" placeholder="Address" ref={addressRef} />
          <Input
            type="number"
            placeholder="Amount"
            step="any"
            ref={amountRef}
          />
          <Input type="submit" placeholder="Amount" value="Search" />
        </Form>
      </FlexRow>
      <Table>
        <THead>
          <TR>
            <TH>Index</TH>
            <TH>From</TH>
            <TH>To</TH>
            <TH>Amount</TH>
            <TH>Gas</TH>
            <TH>Gas Price</TH>
          </TR>
        </THead>
        <TBody>
          {transactions.map((transaction) => (
            <TR
              key={transaction.transactionIndex}
              onClick={() => handleTransactionClick(transaction)}
            >
              <TD>{transaction.transactionIndex}</TD>
              <TD>{transaction.from}</TD>
              <TD>{transaction.to}</TD>
              <TD>{utils.formatUnits(transaction.value, "ether")}</TD>
              <TD>{transaction.gas}</TD>
              <TD>{utils.formatUnits(transaction.gasPrice, "ether")}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </Container>
  );
};

export default Transactions;
