const bcrypt = require('bcrypt')
const User = require('../model/user')


const createNewUser = async (req,res) =>{
    const {username, password} = req.body
    // making sure that user entered the required info
    if(!username || !password){
        return res.status(400).json({"message":"username and pass are required!"})
    }
    // if the username exists in database the new user should choose another username
    const duplicate = await User.findOne({username:username}).exec()
    console.log(duplicate)
    if(duplicate){
        //conflict
        return res.status(409).json({"message":"User already exists"})
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10)

        //create and store in mongo
        const newUser = User.create({
            "username":username,
            "password":hashedPassword,
        })
        
        console.log(newUser)
        res.redirect('/home.html');
    }catch(err){
        res.status(500).json({"message":err.message})
    }

}

module.exports = {
    createNewUser,
}