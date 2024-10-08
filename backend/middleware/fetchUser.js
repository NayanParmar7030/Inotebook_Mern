const jwt = require('jsonwebtoken');
const securekey = "Nayan@7030";

const fetchUsers = (req, res, next) => {
    const rqToken = req.headers['auth-token'];

    if (!rqToken) {
        return res.status(401).send({ error: "Auth token is missing" });
    }
    try {
        const data = jwt.verify(rqToken, securekey);
        req.user = data.user;
        next();
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: error.message });
    }
}
module.exports = fetchUsers;
