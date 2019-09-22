import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";

const ASSETS_EXTENSION = ["js", "css", "png", "jpeg", "jpg", "woff"];

const middleware = (app, config) => {
  app.disable("x-powered-by");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan("combined"));
  app.use(
    express.static(path.resolve(config.publicPath), {
      etag: true,
      lastModified: true,
      setHeaders: (res, urlPath) => {
        const extension = urlPath.substring(urlPath.lastIndexOf("."));
        if (extension === "html") {
          res.setHeader("Cache-Control", "max-age=3600");
        } else if (ASSETS_EXTENSION.includes(extension)) {
          res.setHeader("Cache-Control", "max-age=864000");
        }
      }
    })
  );
};

export default middleware;
