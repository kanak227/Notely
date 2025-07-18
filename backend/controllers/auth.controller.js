import {User} from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { generateTokenAndSaveCookie } from '../utils/generateTokenAndSaveCookie.js';
import { sendVerificationEmail } from '../mailtrap/emails.js';

export const login = async(req , res) =>{
    res.send('this is login');
}

export const logout = async(req , res) =>{
    res.send('this is logout');
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