import React from "react";
import BrowserRouter from "react-router-dom/BrowserRouter";
import { hydrate } from "react-dom";

import App from "./App";

function start() {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
}

if (module.hot) {
  module.hot.accept();
}

export default start;
