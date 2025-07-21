import { matchedData, validationResult } from "express-validator";
import User from "../models/User.mjs";
import { users } from "../data/users.mjs";
import { hashPassword } from "../utils/hash.mjs";
import bcrypt from "bcryptjs";

const profiles = async (req, res) => {
    try {
        const users = await User.find({}, { passwordHash: 0 }); // Loại bỏ passwordHash
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

    res.status(201).json(userResponse);

}

const login = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const data = matchedData(req);
    const findUser = users.find(user => user.email === data.email && user.role === data.role);
    if (!findUser) {
        return res.status(404).send('Cannot find the user!');
    }
    bcrypt.compare(data.password, findUser.passwordHash, (err, result) => {
        if (err) {
            return res.status(500).send({
                msg: 'Internal server error!',
                errors: err
            });
        }
        if (!result) {
            return res.status(401).send("Invalid password");
        }
        res.status(200).send({
            msg: 'Login successful',
            data: findUser
        });
    });
}

export default {
    register,
    login,
    profiles,
    profile
}