const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();
const colors = require("colors");
 require("dotenv").config()
// const DBConnect = require("./utils/dbConnect");

const app = require("./app");

// database connection
  mongoose.connect(process.env.LOCAL_DATABASE).then(()=>{
    console.log(`database coonction is successfull`)
})

// server
const port = process.env.PORT ||5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});