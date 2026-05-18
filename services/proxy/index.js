const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

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

const PORT = 9002;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Proxy service started on port ${PORT}`);
});
