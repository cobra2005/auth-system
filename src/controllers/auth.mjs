import { matchedData, validationResult } from "express-validator";
import User from "../models/User.mjs";
import { hashPassword, comparePassword } from "../utils/hash.mjs";

const profile = async (req, res) => {
    try {
        const { _id: id } = req.session.user;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Missing or invalid user ID',
                error: {
                    statusCode: 400,
                    details: ["Missing or invalid user ID"]
                }
            });
        }
        const user = await User.findById(id).select('-passwordHash -__v');
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
                error: {
                    statusCode: 404,
                    details: ["User not found"],
                }
            });
        }
        return res.status(200).send({
            success: true,
            message: "Get user profile successfully",
            data: {
                statusCode: 200,
                user,
            }
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'Failed to get user data',
            error: {
                statusCode: 500,
                details: err,
            }
        })
    }
}

const register = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({
                success: false,
                message: 'Validation error',
                error: {
                    statusCode: 400,
                    details: result.array(),
                }
            })
        }
        const data = matchedData(req);
        const { username, email, password, role } = data;

        // Check existing user
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exists',
                error: {
                    statusCode: 400,
                    details: ['User already exists'],
                }
            })
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
            success: true,
            message: 'Registration successful',
            data: {
                statusCode: 201,
                user: userResponse,
            }
        });

    } catch (err) {
        console.error('Register error:', err);
        res.status(500).send({
            success: false,
            message: 'Register failed',
            error: {
                statusCode: 500,
                details: ['Register failed'],
            }
        })
    }
}

const login = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({
                success: false,
                message: 'Validation error',
                error: {
                    statusCode: 400,
                    details: result.array(),
                }
            })
        }
        const data = matchedData(req);
        const { email, password, role } = data;

        // Find user in db
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
                error: {
                    statusCode: 404,
                    details: ["User not found"],
                }
            });
        }

        // Compare password
        const isMatched = await comparePassword(password, user.passwordHash);
        if (!isMatched) {
            return res.status(401).send({
                success: false,
                message: "Password is incorrect",
                error: {
                    statusCode: 404,
                    details: ["Password is incorrect"],
                }
            });
        }


        // Create a user object without passwordHash to return
        const userResponse = user.toObject();

        req.session.user = userResponse;
        delete userResponse.passwordHash;

        res.status(200).send({
            success: true,
            message: 'Login successful',
            data: {
                statusCode: 200,
                user: userResponse
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send({
            success: false,
            message: 'Login failed',
            error: {
                statusCode: 500,
                details: ['Login failed']
            }
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        console.log(req.session.user);
        const { id } = req.params;
        const { _id: userId, role } = req.session.user;

        if (userId !== id && role !== 'admin') {
            return res.status(403).send({
                success: false,
                message: 'Only admin can delete any user',
                error: {
                    statusCode: 403,
                    details: ['Only admin can delete any user'],
                }
            })
        }

        // Prevent admin from deleting admin account (feature under development)
        // if(role === 'admin' && userId === id) {
        //     return res.status(400).send({
        //         error: 'Admin cannot self-delete. Contact super admin.'
        //     })
        // }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send({
                success: false,
                message: "User not found",
                error: {
                    statusCode: 404,
                    details: ["User not found"],
                }
            });
        }

        res.status(200).send({
            success: true,
            message: 'User is deleted successfully',
            data: {
                statusCode: 200,
                deletedUserId: deletedUser._id
            }
        });

    } catch (err) {
        res.status(500).send({
            success: true,
            message: 'Server error during deletion',
            error: {
                statusCode: 500,
                details: ['Server error during deletion'],
            }
        })
    }
}

const logout = (req, res) => {
    req.session.user = null;

    req.session.save((err) => {
        if (err) {
            console.error('Error when save session:', err);
            return res.status(500).send({
                success: false,
                message: 'Error when logout',
                error: {
                    statusCode: 500,
                    details: ['Error when logout', 'Error when save session', err]
                }
            })
        }

        res.status(200).send({
            success: true,
            message: 'Logout successfully',
            data: {
                statusCode: 200,
                details: ['Logout successfully'],
            }
        })
    });

}

export default {
    register,
    login,
    logout,
    profile,
    deleteUser
}