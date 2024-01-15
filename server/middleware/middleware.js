const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Middleware = async (req, res, next) => {
    try {
        // Check if the token is present in the request cookies
        if (!req.cookies.jwtoken) {
            return res.status(401).json({ error: 'Unauthenticated', message: 'No token found' });
        }

        // Verify the token
        const token = req.cookies.jwtoken;
        const verifierToken = jwt.verify(token, process.env.SECRET_KEY);

        // Find the user associated with the token in the database
        const rootUser = await User.findOne({ _id: verifierToken._id, "tokens.token": token });

        // If no user is found, throw an error
        if (!rootUser) {
            throw new Error('User not found');
        }

        // Set request properties for later use in the route
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Handle specific errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Unauthenticated', message: 'Token has expired' });
        }

        res.status(401).json({ error: 'Unauthenticated', message: 'Invalid token' });
    }
};

module.exports = Middleware;
