import User from "../models/user.js";
import Token from "../models/token.js";
import  bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../common/mail.js";



// Register new user
const register = async (req,res)=>{
    try {
        
        const {firstName,lastName,email,password} = req.body
           
        // Check if user exists
        const userExists = await User.findOne({email : email})
       
        if (userExists){
            res.status(400).json({message : 'Email is already  used'})
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        // save user 
        const newUser = await User.create(req.body);
        const Activation_key = crypto.randomBytes(10).toString("hex");
        const data={
            userId : newUser._id,
        }
        const token = jwt.sign(data,Activation_key, {expiresIn :"24h"});
        await User.updateOne({_id : newUser._id}, {$set :{token : token}}, {new : true});
     
        // send email
      const link = `${process.env.BASE_URL}/account-activation/${token}`;
      console.log(link)
      await sendEmail(email,"Sign up confirmation",{name : firstName ,link : link},"./templates/registrationConfirmation.ejs")
        res.status(201).json({message :  `Email has been sent to ${email}. Follow the instruction to activate your account`})

    } catch (error) {
        res.status(500).json({message : error.message})
    } 
}

// Account Activation
const accountActivation = async (req,res)=>{
    try {
        const token = req.params.activationCode
       
        const user = await User.findOne({token : token});
        if(!user){
            res.status(400).json({message : "Your verification link has expired"})
        }
        await User.updateOne({_id : user._id} , {$set : {confirmed : true}},{new : true});
        res.status(200).json({message : 'activation success!'})
    } catch (error) {
        res.status(500).json({message : 'Server Error'})
    }
}

// login user
const login = async (req,res)=>{
    try {
       const {email, password} = req.body;

       // find user
        const user = await User.findOne({email : email})
       
        if(!user){
           return res.status(400).json({message : "user does not exist"})
        }
            if (user.confirmed) {
                const passMatch = await bcrypt.compare(password, user.password);
                if(!passMatch){return res.status(400).json({message : "check your email or your password!"})};
            
                // generate user token
                const data={
                    userId : user._id,
                    userEmail:user.email
                }
                const token = jwt.sign(data,process.env.SECRET_KEY, {expiresIn : '2h'});

                return res.status(200).json({token, message : "successfully logged in"});
            } else {
                return res.status(400).json({message : "your account is not activated. please check your email for activation instructions"});
            }
            

    } catch (error) {
        res.status(500).json({message :"Server Error"})
    }
}


// logout 
const logout = async (req, res) => {
    try {
      await req.logout((err) => {
        if (err) {
          res.status(500).json({ message:  err.message  });
        } else {
          res.json({ message: "Successfully Logged Out" });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

//Forgot Password
const forgotPassword = async(req,res)=>{
    try {
        const {email} = req.body;
        console.log(email)
        // check if user exists
        const user = await User.findOne({email});
        console.log(user)
        if(!user){
            return res.status(400).json({message : "user with given email doesn't exist"})
        }
        const JWT_SECRET = crypto.randomBytes(32).toString("hex");
        const data={
            userId : user._id,
            userEmail:user.email
        }

        // generate reset link
        const token = jwt.sign(data, JWT_SECRET, {expiresIn : "10m"});
        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token}`;
        await sendEmail(email,"Reset Password",{name : user.firstName ,link : link},"./templates/resetPassword.ejs")
        res.status(200).json({message : `Password reset link has been sent to ${email}`});
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Server Error!"})
    }
}

// Reset Password
const resetPassword = async(req,res)=>{
    try {
        const {id, resetToken} = req.params;
        const {newPassword} = req.body.password;
        const user = await User.findById(id);
        const token = await Token.findOne({
            userId : user.id,
            token : resetToken
        })
       if(!token){
        return res.status(400).json({message : 'invalid link or expired'})
       }

        // hashing the newPassword
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        await User.updateOne({_id : id},{$set : {password : hash}},{new : true});
        await token.delete();
        await sendEmail(user.email,"Change Password confirmation",{name :user.firstName},"./templates/confirmResetPassword.ejs")
        res.status(200).json({message : "Password changed successfully. Please login with your new password"});
        

    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Server Error'})
    }
}

export {register, login, logout,accountActivation ,forgotPassword, resetPassword}