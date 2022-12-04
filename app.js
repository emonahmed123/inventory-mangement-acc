const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

// middlewares
app.use(express.json());
app.use(cors());


//routes
const productRoute =require("./routes/product.route")
const brandRoute =require("./routes/brand.route")
const categoryRoute = require("./routes/category.route");
const storeRoute = require("./routes/store.route");
const suplierRoute = require("./routes/suplier.route");
const stockRoute = require("./routes/stock.route");
const userRoute = require("./routes/user.route");



app.use('/api/v1/product',productRoute);
app.use('/api/v1/brand',brandRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/suplier", suplierRoute);
app.use("/api/v1/stock", stockRoute);
 app.use("/api/v1/user", userRoute);


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});




module.exports = app;