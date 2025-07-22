import { matchedData, validationResult } from "express-validator";
import User from "../models/User.mjs";
import { hashPassword, comparePassword } from "../utils/hash.mjs";

const profile = async (req, res) => {
    try {
        const { id } = req.cookies;
        if (!id) return res.status(400).json({ error: 'Invalid or missing user ID!' });
        const user = await User.findById(id).select('-passwordHash -__v');
        if (!user) return res.status(404).json({ error: 'User not found!' });
        return res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get user!' });
    }
}

const register = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const data = matchedData(req);
    console.log(data);
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
        password,
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

        res.cookie('id', user._id, { maxAge: 60000 * 60 * 24 });
        res.cookie('role', user.role, { maxAge: 60000 * 60 * 24 });
        
        res.status(200).send({ 
            msg: 'Login successful',
            user: userResponse
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId, role } = req.cookies;
    
        // Only admin can delete any user
        if(userId !== id && role !== 'admin') {
            return res.status(403).send({
                error: 'Only admin can delete any user!'
            })
        }
    
        // Prevent admin from deleting admin account (feature under development)
        // if(role === 'admin' && userId === id) {
        //     return res.status(400).send({
        //         error: 'Admin cannot self-delete. Contact super admin.'
        //     })
        // }
    
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) {
            return res.status(404).send({
                error: 'User not found!'
            })
        }
    
        res.status(200).send({
            msg: 'User is deleted successfully',
            deletedUserId: deletedUser._id
        });

    } catch (err) {
        console.error('Delete user error:', err);
        res.status(500).json({ error: 'Server error during deletion' });
    }
}

const logout = (req, res) => {
    res.clearCookie('id');
    res.clearCookie('role');
    res.status(200).send({ msg: 'Logout successfully!' })
}

export default {
    register,
    login,
    logout,
    profile,
    deleteUser
}