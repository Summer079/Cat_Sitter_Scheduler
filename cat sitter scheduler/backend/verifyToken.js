const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        console.log("NO toke found", token)
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("invalid token")
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId; // Attach userId to request object
        next(); // Pass control to the next middleware or route
    });
};

module.exports = { verifyToken };
