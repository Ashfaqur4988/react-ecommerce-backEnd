const express = require("express");
const {
  fetchLoggedInUserOrders,
  createOrder,
  adminUpdateOrder,
} = require("../controller/Order");
const router = express.Router();

router
  .get("/", fetchLoggedInUserOrders)
  .post("/", createOrder)
  .patch("/:id", adminUpdateOrder);

exports.router = router;
