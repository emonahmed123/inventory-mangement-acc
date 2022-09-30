const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

// middlewares
app.use(express.json());
app.use(cors());
const productRoute =require("./routes/product.route")


app.use('/api/v1/product',productRoute)

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;