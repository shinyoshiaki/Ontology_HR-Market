import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "./createStore";
import Main from "./containers/pages/main";
import { HashRouter as Router, Route } from "react-router-dom";
import Stream from "./containers/pages/stream";
import * as Ontology from "ontology-dapi";

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
        <Route exact path="/" component={Main} />
        <Route path="/stream" component={Stream} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
