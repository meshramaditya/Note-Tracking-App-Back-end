"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.signupUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// ✅ Signup Controller
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, dob } = req.body;
    console.log('Incoming Signup Request:', req.body); // 👈 add this
    try {
        if (!email || !password || !name || !dob) {
            res.status(400).json({ message: 'All fields are required ❌' });
            return;
        }
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists ❌' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.default.create({
            email,
            password: hashedPassword,
            name,
            dob,
        });
        res.status(201).json({ message: 'User registered ✅', user });
    }
    catch (err) {
        console.error('Signup Error:', err.message);
        res.status(500).json({ message: 'Signup failed ❌', error: err.message });
    }
});
exports.signupUser = signupUser;
// ✅ Login Controller
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found ❌' });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Incorrect password ❌' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful ✅',
            token,
            user,
        });
    }
    catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Login failed ❌' });
    }
});
exports.loginUser = loginUser;
