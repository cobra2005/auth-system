import { matchedData, validationResult } from "express-validator";
import { users } from "../data/users.mjs";
import { hashPassword } from "../utils/hash.mjs";
import bcrypt from "bcryptjs";

const profiles = (req, res) => {
    res.send(users);
}

const profile = (req, res) => {
    const { findUserIndex } = req;
    const findUser = users[findUserIndex];
    return res.status(200).send(findUser);
}

const register = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const data = matchedData(req);
    let newUser;
    hashPassword(data.password)
        .then(hashedPassword => {
            newUser = {
                id: (users.length + 1).toString(),
                ...data,
                passwordHash: hashedPassword,
                isActive: true,
            }
            users.push(newUser);
            res.status(201).send(newUser);
        })
        .catch(err => {
            console.error(`Cannot register: ${err}`);
        })
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
        if(!result) {
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