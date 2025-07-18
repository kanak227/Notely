import {User} from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import crypto from 'crypto';
import { generateTokenAndSaveCookie } from '../utils/generateTokenAndSaveCookie.js';
import { sendVerificationEmail } from '../mailtrap/emails.js';
import { PASSWORD_RESET_REQUEST_TEMPLATE } from '../mailtrap/emailTemplates.js';

export const login = async(req , res) =>{
    const {email , password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({success:false , message: "user not there" });
        }

        const isValid = await bcryptjs.compare(password , user.password);
        if(!isValid) {return res.json(400).json({message:"incorrect credentials" , success: false});}

        generateTokenAndSaveCookie(res , user._id);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            message: "logged in",
            success: true,
            user:{
                ...user._doc,
                password: undefined
            }
        })


    }

    catch(error) {
        throw new Error(error);
    }
}

export const logout = async(req , res) =>{
    res.clearCookie("token");
    res.status(200).json({message: "Logged out successfully" , success: true});
}

export const sign_up = async(req , res) =>{
    
    const {name , email , password} = req.body;
    try{
        if(!name || !email || !password){
            throw new Error ("All fields are required");
        }

        const userAlreadyExists =await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({success: false , message: "User already exists"});
        }

        const hashedPassword = await bcryptjs.hash(password , 10);
        const verificationToken = Math.floor(100000 + Math.random()*900000).toString();

        const user = new User ({
            name , email , 
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24*60*60*1000
        })
        await user.save();
        //jwt 
        generateTokenAndSaveCookie(res , user._id);
        await sendVerificationEmail(user.email , verificationToken);


        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                ...user._doc,
                password: undefined
            }
        })

    }
    catch(error){
        res.status(400).json({success: false , message: error.message});
    }
}


export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ message: "Invalid entry" });
        }
        // Respond with user info (excluding password)
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log("error in check-auth");
        res.status(500).json({ message: error.message });
    }
}
