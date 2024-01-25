const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { SEKRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(res.status(401).json({ message: "Not authorized" }));
  }
  try {
    const { id } = jwt.verify(token, SEKRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(res.status(401).json({ message: "Not authorized" }));
    }
    req.user = user;
  } catch {
    next(res.status(401).json({ message: "Not authorized" }));
  }

  next();
};

module.exports = authenticate;
