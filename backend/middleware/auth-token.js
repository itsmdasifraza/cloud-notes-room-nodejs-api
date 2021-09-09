var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header("auth-token");
    console.log("token : ", token);
    if (!token) {
        return res.status(401).json({ mssg: "access denied - unauthorized" });
    }
    const jwtSecret = "secretEncryptionByAsif";
    try {
        const data = jwt.verify(token, jwtSecret);
        console.log(verified);
        req.user = data.user;
        next();
    }
    catch (error) {
        return res.status(401).json({ mssg: "access denied - unauthorized" });
    }
}