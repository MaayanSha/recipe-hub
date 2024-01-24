const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const bcrypt = require('bcrypt')


router.route('/').post(async(req, res)=>{
    //verify username is not taken
    const findUser = await User.findOne({username:req.body.username})
    if(findUser){
        return res.sendStatus(401)
    }
    //create new user in db
    //encrypt password w salt
    const user = new User({
        username: req.body.username,
        email:req.body.email,
        password: req.body.password
    })
    user.save()
    return res.sendStatus(200)
})

module.exports = router