import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export default async function authMiddleware(req, res, next) {
    // Grab the Bearer token from the Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token missing"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify token and extract payload
        const payload = jwt.verify(token, JWT_SECRET);

        // ✅ FIX: '.password' should be '-password' to exclude the password field
        const user = await User.findById(payload.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to next middleware/controller
    } catch (error) {
        console.log("JWT verification failed in authMiddleware:", error);
        return res.status(401).json({
            success: false,
            message: "Token invalid or expired"
        });
    }
}
