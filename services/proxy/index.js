const express = require("express");
//! npm install express-http-proxy
const proxy = require("express-http-proxy");
const cors = require("cors");

const app = express();
app.use(cors());

app.use("/api/v1/auth", proxy("http://localhost:9000"));
app.use("/api/v1/posts", proxy("http://localhost:9001"));

app.use("/api/v1/auth", authProxy);
app.use("/api/v1/posts", postProxy);

const PORT = process.env.PORT || 9002;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Proxy service started on port ${PORT}`);
});
