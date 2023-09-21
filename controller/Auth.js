const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.checkUser = async (req, res) => {
  try {
    //within quotes the projection, till what we need to provide
    const user = await User.findOne({ email: req.body.email }).exec();
    //TEMPORARY check
    if (!user) {
      res.status(401).json({ message: "No such user!" });
    } else if (user.password === req.body.password) {
      res
        .status(200)
        .json({
          id: user.id,
          email: user.email,
          name: user.name,
          addresses: user.addresses,
        });
    } else {
      res.status(401).json({ message: "invalid credential" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
