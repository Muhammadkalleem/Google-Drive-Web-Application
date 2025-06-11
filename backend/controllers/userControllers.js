import Register from '../models/Register.js';
//import LoginLog from '../models/Login.js';
import LoginLog from '../models/login.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExist = await Register.findOne({ email });
  if (userExist) return res.status(400).json({ msg: "User already exists" });

  // Hash password and save
  const hash = await bcrypt.hash(password, 10);
  await Register.create({ name, email, password: hash });

  res.status(201).json({ msg: "Registered successfully" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Register.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid email or password" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid email or password" });

  // ✅ Save login log
  const loginLog = new LoginLog({ email });
  await loginLog.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
};

export const getProfile = async (req, res) => {
  const user = await Register.findById(req.user.id).select('-password');
  res.json(user);
};
