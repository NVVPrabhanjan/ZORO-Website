import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validate } from "deep-email-validator";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const validation = await validate(email);

    if (!validation.valid) {
      return res.status(400).json({ message: "Invalid or undeliverable email" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password: hashedPassword, image });
    res.status(201).json({ message: "User Registered", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "final");
    console.log("Hello",token)
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};