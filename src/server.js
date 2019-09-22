import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";

import View from "./server/views";
import html from "./server/views/html";

import middleware from "./server/middleware";
import db from "./server/middleware/db";
import routes from "./server/routes";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

db({
  url: "mongodb://localhost:27017/shr-jukebox"
});

middleware(server, {
  publicPath: "build"
});

server.use("/api", routes);

server.get("/*", (req, res) => {
  const context = {};
  const markup = renderToString(<View context={context} url={req.url} />);

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(html(markup, assets));
  }
});

export default server;
