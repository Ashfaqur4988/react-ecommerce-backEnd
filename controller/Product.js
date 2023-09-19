const { Product } = require("../model/Product");

//create a new product
exports.createProduct = async (req, res) => {
  //creating an instance of the Product from the model folder
  const product = new Product(req.body);
  //saving the product
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

//fetch product by filters sort and pagination
exports.fetchAllProduct = async (req, res) => {
  //need all query strings to fetch the data
  let query = Product.find({});
  //for total count
  let totalProductQuery = Product.find({});

  //category is also in the query
  if (req.query.category) {
    //filter object = {category: ["smartphone","laptop]"}
    query = query.find({ category: req.query.category });
    totalProductQuery = totalProductQuery.find({
      category: req.query.category,
    });
  }

  //brand is also in the query
  if (req.query.brand) {
    //filter object = {brand: brandName}
    query = query.find({ brand: req.query.brand });
    totalProductQuery = totalProductQuery.find({ brand: req.query.brand });
  }

  //sorting query
  if (req.query._sort && req.query._order) {
    //sort object = {_sort: "price", _order:"desc"}
    query = query.sort({ [req.query._sort]: req.query._order });
    totalProductQuery = totalProductQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }

  //total count
  const totalDocs = await totalProductQuery.count().exec();
  console.log({ totalDocs });

  //pagination is also in the query
  if (req.query._page && req.query._limit) {
    //pagination = {_page:1, _limit:10} //_page=1&_limit=10
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize); //skip query is used in pagination
    totalProductQuery = totalProductQuery
      .skip(pageSize * (page - 1))
      .limit(pageSize);
  }

  //saving the product
  try {
    const docs = await query.exec(); //to execute the get method
    res.set("X-Total-Count", totalDocs);
    res.status(201).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};
