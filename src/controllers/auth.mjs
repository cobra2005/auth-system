import { matchedData, validationResult } from "express-validator";
import User from "../models/User.mjs";
import { users } from "../data/users.mjs";
import { hashPassword, comparePassword } from "../utils/hash.mjs";

const profiles = async (req, res) => {
    try {
        const users = await User.find({}, { passwordHash: 0 }); // Remove passwordHash
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
}

const profile = async (req, res) => {
    try {
        const { findUserIndex } = req;
        const user = await User.findById(findUserIndex, { passwordHash: 0 });
        if (!user) return res.status(404).json({ error: 'User not found' });
        return res.status(200).send(findUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get user' });
    }
}

const register = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const data = matchedData(req);
    const { username, email, password, role } = data;

    // Check existing user
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
        username,
        email,
        passwordHash: await hashPassword(password),
        role: role || 'user'
    });

    const savedUser = await newUser.save();

    // Remove sensitive data before sending response
    const userResponse = savedUser.toObject();
    delete userResponse.passwordHash;

    res.status(201).send({
        msg: 'Register successful',
        user: userResponse
    });

}

const login = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    try {
        const data = matchedData(req);
        const { email, password, role } = data;

        // Find user in db
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.status(404).send({ error: 'User not found!' });
        }

        // Compare password
        const isMatched = await comparePassword(password, user.passwordHash);
        if (!isMatched) {
            return res.status(401).send({ error: 'Password is incorrect!' });
        }

        // Create a user object without passwordHash to return
        const userResponse = user.toObject();
        delete userResponse.passwordHash;
        
        res.status(200).send({ 
            msg: 'Login successful',
            user: userResponse
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
}

export default {
    register,
    login,
    profiles,
    profile
}