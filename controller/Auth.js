const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json({ id: doc.id, role: doc.role, email: doc.email });
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
      res.status(200).json({
        id: user.id,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "invalid credential" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
