import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const Register = mongoose.model('Register', userSchema); // Collection: registers
export default Register;
