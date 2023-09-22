const { Cart } = require("../model/Cart");

exports.addToCart = async (req, res) => {
  const cart = new Cart(req.body);

  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchItemsByUserId = async (req, res) => {
  const { user } = req.query;

  try {
    const cartItems = await Cart.find({ user: user }).populate("product"); //populate the product & user field with the given id
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteItemFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Cart.findByIdAndDelete(id);
    const result = doc.populate("product"); //very important
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    // const result = doc.populate("product");
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};
