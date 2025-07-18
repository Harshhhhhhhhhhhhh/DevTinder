const express = require("express");
const { SignUpValidation } = require("../utils/validation.js");
const bcrypt = require('bcrypt');
const User = require("../models/userSchema.js");
const { loginValidation } = require("../utils/validation.js");

const authRouter = express.Router();



authRouter.post("/signUp", async (req, res) => {

    const { firstName, lastName, emailId, password, age, gender, skills, about } = req.body

    //Validation of data
    SignUpValidation(req);

    //Encrypting the password
    const hashPassword = await bcrypt.hash(password, 10);

    //creating new instance of of the User Model
    const user = new User({
        firstName, lastName, emailId, password: hashPassword, age, gender, skills, about
    })

    try {
        const savedUser = await user.save();
        const token = savedUser.getJWT()
        res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) })
        res.json({ message: "User signup successfully", data: savedUser });


    }
    catch (err) {
        res.status(400).send("Error while saving the user  ERR: " + err.message)

    }


})



authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        // Validate email
        loginValidation(req);

        // Check if user exists
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Incorrect credentials");
        }

        // Validate password
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new Error("Incorrect credentials");
        }

        // Generate token
        const token = user.getJWT();

        // Set cookie
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000), // 8 hours
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        });

        // Send response
        res.status(200).json({ message: "User logged in successfully", data: user });
    } catch (err) {
        // Return proper JSON error
        res.status(400).json({
            error: true,
            message: err.message || "Invalid credentials",
        });
    }
});



authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })
    res.send("User logedOut");

})



module.exports = authRouter;