const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next) =>{
    const authorizationHeader = req.headers.authorization || req.headers.Authorization

    if(!authorizationHeader?.startsWith('Bearer ')){
        return res.sendStatus(401)
    }
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err,data)=>{
            if(err){
                console.log(err)
              return  res.sendStatus(403) //forbidden
            }
            req.user = data.userInfo.username
            
            next()
        }
    )
}

module.exports = verifyJWT