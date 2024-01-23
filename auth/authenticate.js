const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const headerAuth = req.headers['authorization'];
    const token = headerAuth && headerAuth.slice(' ')[1];
    if (!token){
        return res.sendStatus(401)
    }
    jwt.verify(token, PROCESS.env.AUTH_TOKEN, (err, user)=>{
        if (err){
            return res.sendStatus(401)
        }
        req.user = user
        next();
    })

}
module.exports = authenticateToken;