const db = require("../Models");
const jwt = require("jsonwebtoken");
const {responseJSON} = require("../helper/responce");
const { QueryTypes, where, Op } = require("sequelize");

// declaring the usermodel
const User = db.users;

const randomCodeGenrator = (name = "") => {
  var result = "";
  if (name.length > 0) {
    result = Math.floor(10000000 + Math.random() * 90000000);
  } else {
    result = Math.floor(1000 + Math.random() * 9000);
  }
  var code = result;
  if (name.length > 0) return name + code;
  return code;
};

exports.loginRegisterUser = async (req, res) => {
  try {
    const { phone , company, email, user_name} = req.body;
    // find user
    const user = await User.findOne({
      where: {
        phone: phone,
      },
    });

    // if user exist 
    if (user) {
        const token = jwt.sign({ id: user.user_id }, process.env.secretKey, {
          expiresIn: process.env.expiresIn,
        });
        await user.update({
          phone , company, email, user_name
        })
        return await responseJSON(res, 200, "user logged in", { user, token });
    } else { // if user does not exist

        let userObject = { phone, email, user_name, company }
         const user = await User.create(userObject);
        const token = jwt.sign({ id: user.user_id }, process.env.secretKey, {
            expiresIn: process.env.expiresIn,
          });
        return await responseJSON(res, 200, "user registered in", { user, token });
    }
    
  } catch (error) {
    return await responseJSON(res, 400, "something went wrong", error.message);
  }
};


exports.checkToken = async(req, res)=>{
  try {
        if(req.user?.user_id){
          return await responseJSON(res, 200, "valid user", true);
        }else{
          return await responseJSON(res, 200, "in valid user", false);
        }
  } catch (error) {
    return await responseJSON(res, 400, "something went wrong", error.message);
  }
}

