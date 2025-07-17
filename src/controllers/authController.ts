import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// ✅ Signup Controller
export const signupUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, dob } = req.body;

  console.log('📥 Signup Request:', req.body);

  try {
    if (!email || !password || !name || !dob) {
      res.status(400).json({ message: 'All fields are required ❌' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists ❌' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      dob,
    });

    res.status(201).json({ message: 'User registered ✅', user });
  } catch (err: any) {
    console.error('Signup Error:', err.message);
    res.status(500).json({ message: 'Signup failed ❌', error: err.message });
  }
};

// ✅ Login Controller
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required ❌' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found ❌' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Incorrect password ❌' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful ✅',
      token,
      user,
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Login failed ❌' });
  }
};
