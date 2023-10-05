import React from "react";
import ReactDOM from "react-dom/client";
import Myproject from "./Myproject";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./states/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <Myproject />
      </BrowserRouter>
  </Provider>
);

