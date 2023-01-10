import nodemailer from "nodemailer";
import ejs from "ejs";

export default function sendEmail (email,subject,options,filepath,attachment){  
  
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD, // generated ethereal password
        },
    });
  
    //mail options
    let template;
    ejs.renderFile(filepath,options,(err ,data)=>{
        if (err) {
            console.log(err)
        }else{
            template = data;
        }
    })
   // console.log(template)
   var  mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html : template,
        attachments : attachment
    }
 //send mail with defined transport object
    transporter.sendMail(mailOptions, (err,info)=> {
        if (err) {
        console.log(err)
        } else {
             console.log('Mail sent to ',  info.envelope.to)
        }
    })     
} 
 
  