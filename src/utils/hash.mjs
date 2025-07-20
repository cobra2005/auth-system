import bcrypt from "bcryptjs";

export async function hashPassword(password) {
    try {
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 10; // Mặc định là 10 nếu không có env
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("Hashed password:", hashedPassword); // Sẽ in ra hash chuỗi (không phải object rỗng)
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
    }
}