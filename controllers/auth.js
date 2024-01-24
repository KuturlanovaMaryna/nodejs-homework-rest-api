const { User } = require("../models/user");
const { ctrlWrapper } = require("../helpers/ctrlWrapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SEKRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email in use." });
  }

  const createHashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
    subscription,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Email or password is wrong" });
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    res.status(401).json({ message: "Email or password is wrong" });
  }
  const payload = { id: user._id };

  const token = jwt.sign(payload, SEKRET_KEY, { expiresIn: "23h" });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
