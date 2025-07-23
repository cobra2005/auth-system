import User from "../models/User.mjs";

const users = async (req, res) => {
    try {
        const { role } = req.session.user;
        if(role !== 'admin') {
            return res.status(401).send({
                success: false,
                message: 'Only admin can see all users',
                error: {
                    statusCode: 401,
                    details: ['Only admin can see all users'],
                }
            })
        }
        const users = await User.find({}, { passwordHash: 0 }); // Remove passwordHash
        res.status(200).send({
            success: true,
            message: 'Get users successfully',
            data: {
                statusCode: 200,
                users
            }
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Failed to get users',
            error: {
                statusCode: 500,
                details: ['Failed to get users'],
            }
        })
    }
}

const dashboard = async (req, res) => {
    try {
        const { role } = req.session.user;
        if(role !== 'admin') {
            return res.status(401).send({
                success: false,
                message: 'Only admin can see the dashboard',
                error: {
                    statusCode: 401,
                    details: ['Only admin can see dashboard'],
                }
            })
        }
        res.status(200).send({
            success: true,
            message: 'Dashboard',
            data: {
                statusCode: 200,
                data: 'Dashboard',
            }
        })
    } catch (error) {
        // res.status(500).json({ error: 'Failed to get dashboard' });
        res.status(500).send({
            success: false,
            message: 'Failed to get dashboard',
            error: {
                statusCode: 500,
                details: ['Failed to get dashboard']
            }
        })
    }
}

export default {
    users,
    dashboard
}