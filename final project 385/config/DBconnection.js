const mongoose = require('mongoose')
// connecting to the database
const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    }

    // handling errors
    catch(err){
        console.log(err)
    }  

}

module.exports = connectDB