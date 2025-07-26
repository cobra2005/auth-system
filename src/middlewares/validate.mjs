import { validationResult } from "express-validator";
import { loginValidation, registerValidation } from "../utils/validations.mjs";

const validate = (schemas) => {
    return async (req, res, next) => {
        for(const schema of schemas) {
            await schema.run(req);
        }
        const result = validationResult(req);
        if(!result.isEmpty()) {
            return res.status(400).send({
                success: false,
                message: 'Validation error',
                error: {
                    statusCode: 400,
                    details: ['Validation error', ...result.array()],
                }
            })
        }
        next();
    }
}

export const loginValidate = validate(loginValidation);
export const registerValidate = validate(registerValidation);