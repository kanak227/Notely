import express from "express";
import { sign_up , logout , login, checkAuth} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get('/check-auth' , verifyToken , checkAuth);

router.post('/signup' , sign_up);
router.post('/login' , login)
router.post('/logout' , logout)

export default router;