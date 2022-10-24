const userModel = require('../models/user');
const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
// ----------------------------------------------------------------------------------
// End point defining the signup for the new user
routes.post('/signup', async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({
            created_user: newUser
        });
    } catch (error) {
        res.status(500).json({
            "status": false, 
            "message": error.message
        });
    }
});
// ----------------------------------------------------------------------------------
// Route used for logining in the user using the username and password
routes.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({
        username : username,
        password : password
    });

    if(user.password === password) {
        res.status(200).json({"username": user.username, "password": user.password, "message": "SUCCESS: User logged in."});
    }
    else {
        res.status(400).json('FAILURE: Invalid username or password entered.');
    }
});
// ----------------------------------------------------------------------------------

module.exports = routes;
