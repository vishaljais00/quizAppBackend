let nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  var transport = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "vishal.jais00@gmail.com",
      pass: "dUfDwPS8zIMG7yvR"
    }
  });

  const mailOptions = {
    from: "Curekiind <vishal.jais00@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    url: options.resetURL,
    // html
  };

  await transport.sendMail(mailOptions , (error, Info)=>{
    if (error){
        console.log(error)
    }
    
  });
  return 
};
module.exports = sendEmail;
