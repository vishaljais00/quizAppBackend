const db = require("../Models");
const {responseJSON} = require("../helper/responce");
const { QueryTypes, where, Op } = require("sequelize");

// declaring the usermodel
const userAttend = db.attendiModel;

exports.attendCheck = async (req, res) => {
  try {
    const { phone} = req.body;
    // find user
    const userAttendData = await userAttend.findOne({
      where: {
        phone: phone,
      },
    });

    // if user exist 
  
    return await responseJSON(res, 200, "user Attend Data", userAttendData);
    
  } catch (error) {
    return await responseJSON(res, 400, "something went wrong", error.message);
  }
};

exports.attendStatus = async (req, res) => {
    try {
      const {phone , isNew} = req.body;
      // find user
      let userAttendData = await userAttend.findOne({
        where: {
          phone: phone,
        },
      });
  
      userAttendData.visited = true
      userAttendData.isNew = isNew
      await  userAttendData.save()
      // if user exist 
    
      return await responseJSON(res, 200, "your entry is saved", userAttendData);
      
    } catch (error) {
      return await responseJSON(res, 400, "something went wrong", error.message);
    }
};

exports.storeUserAttend = async (req, res) => {
    try {
      const {phone , company, email, user_name,  visited, isNew, designation, table_no} = req.body;
      // find user
      const userAttendData = await userAttend.findOne({
        where: {
          phone: phone,
        },
      });

      if (userAttendData)  return await responseJSON(res, 200, "record already exist with this phone no", userAttendData);
      const createUSerAttend = await userAttend.create({phone , company, email, user_name,  visited, isNew, designation, table_no})

      // if user exist 
    
      return await responseJSON(res, 200, "new user saved", createUSerAttend);
      
    } catch (error) {
      return await responseJSON(res, 400, "something went wrong", error.message);
    }
};


exports.getAllUserAttend = async (req, res) => {
  try {
    
    const userAttendData = await userAttend.findAll();
    return await responseJSON(res, 200, "atendie table", userAttendData);
    
  } catch (error) {
    return await responseJSON(res, 400, "something went wrong", error.message);
  }
};

  

