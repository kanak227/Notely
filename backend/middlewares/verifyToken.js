import jwt from 'jsonwebtoken';

export const verifyToken = (req , res , next) => {

    const token = req.cookies.token;
    if(!token) return res.status(400).json({message: "unauthorized"});

    try{
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    if(!decoded) { return res.json({message: invalid})
    };
    req.userId = decoded.userId;
    next(); 
}

    catch(error){
        throw new Error(error);
    }

} 