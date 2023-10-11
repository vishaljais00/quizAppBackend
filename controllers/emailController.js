const { Sequelize, DataTypes, QueryTypes, where, Op } = require("sequelize");
const {responseJSON} = require('../helper/responce')
const db = require('../Models/')
const sendEmail = require("../common/cybermail")

exports.getList = async(req, res)=>{
    try {

        let areaData = await db.email.findAll()
        return res.status(200).json({data: areaData})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }  
}

exports.SendEmail = async(req, res)=>{
    try {
        let {subject, message} = req.body
        let areaData = await db.email.findAll()
        console.log(areaData)
        for(let i = 0; i < areaData.length; i++){
            let user = areaData[i]
            let option = {
                email: user.email,
                subject: `${subject}`,
                message: `${message}`,
            }
            await sendEmail(option);
        }
        return res.status(200).json({data: "message sent"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: error.message})
    }  
}

exports.bulkCreateUpdate = async(req, res)=>{
    const process = await db.sequelize.transaction();
    try {
        const emailBody = req.body
        let emailDelete = await db.email.destroy({where:{}, force: true})
        let emailData = await db.email.bulkCreate(emailBody)  
        await process.commit();
        return res.status(200).json({data: emailData})
    } catch (error) {
        console.log(error)
        await process.rollback();
        return res.status(400).json({message: error.message})
    }
}