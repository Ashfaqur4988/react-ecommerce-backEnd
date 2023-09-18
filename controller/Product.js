const { Product } = require("../model/Product");

//create a new product
exports.createProduct = (req, res) => {
  //creating an instance of the Product from the model folder
  const product = new Product(req.body);

  //saving the product
  product.save((err, doc) => {
    console.log(doc);
    // catching errors and sending http status code
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(doc);
    }
  });
};
