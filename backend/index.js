import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { db } from './config/db.js';
import authRoutes from './routes/auth.js'
dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.get('/' , (req,res) =>{
    res.send('hi working');
})

app.use('/api/auth' , authRoutes)

app.listen(PORT , ()=>{
    db();
    "Server is running";
});
