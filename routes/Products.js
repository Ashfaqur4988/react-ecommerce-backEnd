const { createProduct, fetchAllProduct } = require("../controller/Product");
const express = require("express");

const router = express.Router();

//for post request of creating a product
// '/products' from the base path
router.post("/", createProduct).get("/", fetchAllProduct);

//exporting the router
exports.router = router;
