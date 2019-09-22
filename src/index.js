import express from "express";

let app = require("./server").default;

if (module.hot) {
  module.hot.accept("./server", () => {
    console.log("HMR Reloading ./server ....");
    try {
      app = require("./server").default;
    } catch (err) {
      console.error(err);
    }
  });
}

const PORT = process.env.PORT || "5000";

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(PORT, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> started on port ${PORT}`);
  });
