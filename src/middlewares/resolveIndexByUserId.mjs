import { users } from "../data/users.mjs";

export default function resolveIndexByUserId(req, res, next) {
    const {
        params: { id },
    } = req; 
    const findUserIndex = users.findIndex(user => user.id === id); // Find user index by id
    if(findUserIndex === -1) return res.sendStatus(404); // Error when user cannot be found
    req.findUserIndex = findUserIndex; // Create a new prop in req named findUserIndex
    next(); // Handle next task
}