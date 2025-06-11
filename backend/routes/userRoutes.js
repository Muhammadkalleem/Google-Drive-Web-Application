import express from 'express';
//import { registerUser, loginUser, getProfile } from '../controllers/userController.js';
import { registerUser,loginUser,getProfile} from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';
//import LoginLog from '../models/Login.js'
import LoginLog from '../models/login.js';
import register from '../models/Register.js';



const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getProfile);

export default router;
