const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Middleware = async (req, res, next) => {
    // res.send(req)
    res.send(req.cookies.jwtoken)
    try {
        const token = req.cookies.jwtoken;
        const verifierToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(token);
        const rootUser = await User.findOne({ _id: verifierToken._id, "tokens.token": token });
        if (!rootUser) {
        throw new Error('User not found')
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    } catch (error) {
        // res.status(401).send("Unauthenticated: No token found")
        // console.log(error);
    }
}
module.exports = Middleware;