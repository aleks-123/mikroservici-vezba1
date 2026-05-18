const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = 9002;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Proxy service started on port ${PORT}`);
});
