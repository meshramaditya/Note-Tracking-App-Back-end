import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // ✅ new
    name: String,
    dob: String,
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);