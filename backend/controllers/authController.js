const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        else{
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({message: 'Invalid credentials'});
            }
            else{
                const token = jwt.sign(
                    { userId: user._id },
                    "secretkey",
                    {expiresIn: '1d'}
                )
                res.json({ token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                 });
            }
        }
    }
    catch(error){
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = { registerUser, loginUser };