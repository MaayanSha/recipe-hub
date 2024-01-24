const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password:  {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required:true
    },
},
{ timestamps: true }
)

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        //if password not modified, go on
        next()
    }
    //if password modified, encrypt the new password before proceeding
    const salt = 10
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
})

module.exports = mongoose.model('User', userSchema, "user");