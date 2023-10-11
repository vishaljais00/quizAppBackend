let nodemailer = require("nodemailer");

const sendEmail = async (options) => {
//   var transport = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: "vishal.jais00@gmail.com",
//       pass: "uqfibzmeumvrpdpr"
//     }
//   });


  var transport = nodemailer.createTransport({
     host: "smtp-relay.brevo.com",
     port: 587,
     secure: false,
     auth: {
      user: "manishgupta2879@gmail.com",
      pass: "hdgzjv9LaImFADQV"
     }
  });

  
  const mailOptions = {
    from: "cybermatrix <info@cybermatrixsolutions.com>",
    to: options.email,
    to: options.email,
    subject: options.subject,
    html: options.message,
    url: options.resetURL,
    // html
  };

  await transport.sendMail(mailOptions , (error, Info)=>{
    if (error){
        console.log(error)
    }
    console.log(Info)
    
  });
  return 
};
module.exports = sendEmail;
