import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
    try {
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 10;
        if (isNaN(saltRounds) || saltRounds < 1) {
            throw new Error('Invalid BCRYPT_ROUNDS value in environment variables');
        }
        
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
};

export const comparePassword = async (password, hashedPassword) => {
    try {
        if (!password || !hashedPassword) {
            throw new Error('Missing password or hashedPassword for comparison');
        }
        
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Failed to compare passwords');
    }
};