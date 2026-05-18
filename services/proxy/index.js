const express = require("express");
//! npm install express-http-proxy
const proxy = require("express-http-proxy");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(
  "/api/v1/auth",
  proxy("http://localhost:9000", {
    proxyReqPathResolver: (req) => req.originalUrl,
  }),
);

app.use(
  "/api/v1/posts",
  proxy("http://localhost:9001", {
    proxyReqPathResolver: (req) => req.originalUrl,
  }),
);

app.listen(9002, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Proxy service started on port 9002`);
});
