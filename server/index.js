const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

const products = require("./routes/api/products");

if(process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
}

app.use("/api/products", products);

app.listen(process.env.PORT || 8081);
