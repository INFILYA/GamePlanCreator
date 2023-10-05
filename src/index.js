import React from "react";
import ReactDOM from "react-dom/client";
import Myproject from "./Myproject";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./states/store";
import "./css/newTutorial.css";
import "./css/newHeader.css";
import "./css/newMain.css";
import "./css/newDistribution.css";
import "./css/newAttack.css";
import "./css/newRatings.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <Myproject />
      </BrowserRouter>
  </Provider>
);

