const express = require("express");
const mongoose = require("mongoose");
const productsRouters = require("./routes/Products"); //'/products' is the base path
const brandsRouters = require("./routes/Brands");
const categoryRouters = require("./routes/Categories");
const cors = require("cors");
const app = express();

//middlewares
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.json()); //to parse req.body
app.use("/products", productsRouters.router);
app.use("/brands", brandsRouters.router);
app.use("/category", categoryRouters.router);

//db connection
try {
  mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("DB connection done");
} catch (error) {
  console.log(error);
}

//home page
app.get("/", (req, res) => {
  res.json({ Status: "Success" });
});

//listener code to run the server
app.listen(8080, (req, res) => {
  console.log("Server is running on port 8080");
});
