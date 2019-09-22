import React from "react";
import { StaticRouter } from "react-router-dom";
import App from "../../ui/App";

export default function View({ context, url }) {
  return (
    <StaticRouter context={context} location={url}>
      <App />
    </StaticRouter>
  );
}
