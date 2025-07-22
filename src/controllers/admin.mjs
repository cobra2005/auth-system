import User from "../models/User.mjs";

const users = async (req, res) => {
    try {
        const { role } = req.cookies;
        if(role !== 'admin') return res.status(401).send('Only admin can see all users!');
        const users = await User.find({}, { passwordHash: 0 }); // Remove passwordHash
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
}

const dashboard = async (req, res) => {
    try {
        const { role } = req.cookies;
        if(role !== 'admin') return res.status(401).send('Only admin can see all users!');
        res.status(200).send({ msg: 'Dashboard!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get dashboard' });
    }
}

export default {
    users,
    dashboard
}