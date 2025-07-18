import mongoose from 'mongoose'

export const db = async() =>{
    try{
        const conn =await  mongoose.connect(process.env.MONGO_URI);
        console.log("db connected");
    }
    catch(error){
        console.log(error.message);
        process.exit(1)
    }
}