const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const db = require("../Models");
const User = db.users;


exports.check = async (req, res, next) => {
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
    console.log(decoded.exp*1000,'decoded.exp * 1000', Date.now())
    if (Date.now() >= decoded.exp * 1000) {
        return res.status(400).json({
          status: 'fail',
          message: 'Token has expired',
        });
      }
    console.log('decoded',decoded)
    const currentUser = await User.findByPk(decoded.id);
    req.user = currentUser.dataValues;
    next();
    
  } catch (error) {
    res.status(400).json({message:error+", please login again check by protect"})
  }
};
