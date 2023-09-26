const { Order } = require("../model/Order");

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const doc = await order.save();
    const result = await doc.populate("user");
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllOrders = async (req, res) => {};

exports.fetchLoggedInUserOrders = async (req, res) => {
  const { user } = req.query;
  try {
    const orders = await Order.find({ user: user });
    res.status(201).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.adminUpdateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};
