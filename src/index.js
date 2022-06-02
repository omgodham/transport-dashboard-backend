const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use("/users", require("./routes-js/user"));
app.use("/trip", require("./routes-js/trip"));
app.use("/customer", require("./routes-js/customer"));
app.use("/vehicle", require("./routes-js/vehicle"));
app.use("/driver", require("./routes-js/driver"));
app.use("/auth", require("./routes-js/auth"));
app.use("/extracharge", require("./routes-js/extracharge"));

// set headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

mongoose
  .connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connnected");
  })
  .catch((err) => {
    console.log(err, "Error Occured Connecting To DB");
  });

app.listen(process.env.PORT || 3003, () => {
  console.log("server running on port 3003", process.env.PORT);
});
