const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const headerAuth = req.header('authorization');
    const token = headerAuth && headerAuth.split(' ')[1];
    if (!token){
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.AUTH_TOKEN, (err, user)=>{
        if (err){
            return res.sendStatus(401)
        }
        req.user = user
        next();
    })

}
module.exports = authenticateToken;