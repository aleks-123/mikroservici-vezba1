const express = require("express");
//! npm install express-http-proxy
const proxy = require("express-http-proxy");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).send("Health okey");
});

// Креирање на деве инстацни на прокси посредник
const authProxy = proxy("http://localhost:9000", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/auth${req.url}`;
  },
});
const postProxy = proxy("http://localhost:9001", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/posts${req.url}`;
  },
});

//овде ќе ги употребиме миделверите што ги правевме погоре
app.use("/api/v1/auth/", authProxy);
app.use("/api/v1/posts/", postProxy);

app.listen(9002, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Proxy service started on port 9002");
});
