import express from 'express'
import dotenv from 'dotenv';

import { db } from './config/db.js';
import authRoutes from './routes/auth.js'
dotenv.config();

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000;

app.get('/' , (req,res) =>{
    res.send('hi working');
})

app.use('/api/auth' , authRoutes)

app.listen(PORT , ()=>{
    db();
    "Server is running";
});



// mongodb+srv://kanakverma325:1iGlXwWHGaUC1gfH@cluster0.lgo6fbg.mongodb.net/
//1iGlXwWHGaUC1gfH