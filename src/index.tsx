import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "./createStore";
import { HashRouter as Router, Route } from "react-router-dom";
import Stream from "./containers/pages/stream";
import * as Ontology from "ontology-dapi";
import buy from "./containers/pages/buy";
import sell from "./containers/pages/sell";
import market from "./containers/pages/market";
import result from "./containers/pages/result";

const data = createStore();
Ontology.client.registerClient({});

(async () => {
  try {
    await Ontology.client.api.provider.getProvider();
  } catch (e) {
    alert("No dAPI provider istalled.");
  }
})();

ReactDOM.render(
  <Provider store={data.store}>
    <Router>
      <div>
        <Route exact path="/" component={buy} />
        <Route path="/sell" component={sell} />
        <Route path="/market" component={market} />
        <Route path="/result" component={result} />
        <Route path="/stream" component={Stream} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
