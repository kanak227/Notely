import express from "express";
import { sign_up , logout , login} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup' , sign_up);
router.post('/login' , login)
router.post('/logout' , logout)

export default router;