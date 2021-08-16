import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Blocks, Transactions, TransactionDetail } from "pages";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/"} component={Blocks} exact />
        <Route
          path={"/blocks/:number/transactions"}
          component={Transactions}
          exact
        />
        <Route
          path={"/blocks/:number/transactions/:index"}
          component={TransactionDetail}
          exact
        />
      </Switch>
    </Router>
  );
};

export default Routes;
