const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const bcrypt = require('bcrypt')

const verifyUser = async(username, password) =>{
    const user = await User.findOne({username:username})
    if (!user){
        return false
    }
    const res = await bcrypt.compare(password, user.password)
    return res;
}

router.route('/').post(async(req, res)=>{
    const isvalid = await verifyUser(req.body.username, req.body.password)
    if(!isvalid){
        return res.sendStatus(403)
    }
    const username = req.body.username
    const user = { name: username}
    const accessToken = jwt.sign(user, process.env.AUTH_TOKEN)
    return res.json({accessToken:accessToken})
})

module.exports = router