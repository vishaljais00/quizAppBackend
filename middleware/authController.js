const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const db = require("../Models");
const User = db.users;


exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(404).json({
        status: "fail",
        message: "No token Found",
      });
    }

    // token verifintg
    const decoded = await promisify(jwt.verify)(token, process.env.secretKey);
    const currentUser = await User.findByPk(decoded.id);
    req.user = currentUser.dataValues;
    next();
    
  } catch (error) {
    res.status(400).json({message:error+", please login again check by protect"})
  }
};
