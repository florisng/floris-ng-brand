const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupValidation, signinValidation } = require('../validation');
const verify = require('./verifyToken');

router.post('/users/register', async (req, res) => {
    try {
        // Let's first validate a user
        const { error } = signupValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        // Check if the user is already in DB
        const emailExist = await User.findOne({email: req.body.email})
        if(emailExist)  return res.status(400).send('Oops !!! Email already exist !!!');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        // Create a new user
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.json(user);
    } catch(err) {
        res.json(err.message);
    }
});

router.post('/users/auth', async (req, res) => {
    try {
        // Let's first validate a user
        const { error } = signinValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        // Check the user credentials
        // Check email
        const user = await User.findOne({email: req.body.email});
        if(!user)  return res.status(400).send('Oops !!! Invalid email or password !!!');
        
        // Check password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Oops !!! Invalid email or password !!!');

        // Create a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth_token', token).send(token);
    } catch(err) {
        res.json(err.message);
    }
});

// Get all users
router.get('/users', verify, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.json(err.message);
    }
});

// Get a specific user
router.get('/users/:postId', verify, async (req, res) => {
    try {
        const user = await User.findById(req.params.postId);
        res.json(user);
    } catch(err) {
        res.send(err.message);
    }
});

// Delete a user
router.delete('/users/:postId', verify, async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({ _id: req.params.postId });
        res.json(deletedUser);
    }catch(err) {
        res.send(err.message);
    }
});

// Update a user
router.patch('/users/:postId', verify, async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.postId },
            { $set: { firstname: req.body.firstname } }
        );
        res.json(updatedUser);
    } catch(err) {
        res.send(err.message);
    }
});

module.exports = router;