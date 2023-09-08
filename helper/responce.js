exports.responseJSON = async(res,status, message, data = null)=>{
    return res.status(200).json({
        status: 200,
        message,
        data
    })
}
