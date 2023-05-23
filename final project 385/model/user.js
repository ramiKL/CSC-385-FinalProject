const mongoose = require('mongoose')
const Schema = mongoose.Schema

// creating the database scheme to store info about users
const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:String 
})

module.exports = mongoose.model('User', userSchema)