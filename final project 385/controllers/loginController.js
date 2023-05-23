const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const loginUser = async (req, res) => {
  const { username, password } = req.body;

// making sure that the user filled the required info

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password cannot be empty" });
  }
  
// finfing the user if he is in the database or not
  try {
    // Find user in the database by username
    const user = await User.findOne({ username });

    // if user not found return error
    if (!user) {
      return res.sendStatus(401); // Unauthorized
    }

    // checking if password matches that in databse 
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const accessToken = jwt.sign(
        {
         "userInfo": {
            "username": user.username,
            
          }
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '1d' }
      );

      const refreshToken = jwt.sign(
        {
          username: user.username
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '1d' }
      );

      // Update the user document with the new refresh token
      await User.findOneAndUpdate({ username }, { refreshToken });


      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      // after success in logging in the user is redirected to home page html
      res.redirect('/home.html'); 
      
    } else {
      res.sendStatus(401); // Unauthorized
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  loginUser
};