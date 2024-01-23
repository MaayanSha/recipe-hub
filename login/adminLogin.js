const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const verifyUser = (username, password) =>{
    const user = await User.find({username:username})
    if (!user){
        return false
    }
    return user.password == password;
}

router.route('/').post(async(req, res)=>{
    if(!verifyUser(req.username, req.password)){
        return res.sendStatus(403)
    }
    const username = req.body.username
    const user = { name: username}
    const accessToken = jwt.sign(user, process.env.AUTH_TOKEN)
    return res.json({accessToken:accessToken})
})

module.exports = router