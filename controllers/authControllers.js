const bcrypt = require('bcryptjs');
const Auth = require('../models/authModels');
const jwt = require('jsonwebtoken');
const {
  AvailableSocialLogins,
  AvailableUserRoles,
  USER_TEMPORARY_TOKEN_EXPIRY,
  UserLoginType,
  UserRolesEnum,
} = require("../utils/constants");

/*
@Paramiters : email, username, password, roll
*/
const registerUser = async (req, res) => {
    try {
        const { email, username, password, role } = req.body;

        // Find user
        const existedUser = await Auth.findOne({
            $or: [{ username }, { email }],
          });

        // Checkk if user exitst or not
          if (existedUser) {
            throw new Error(409, "User with email or username already exists", []);
          }

        // hash password and save user
          const hashPass = await bcrypt.hash(password, 10)
          const user = await Auth.create({
            email,
            password: hashPass,
            username,
            isEmailVerified: false,
            role: role || UserRolesEnum.USER,
          });

        // hide the password and return a responce back
          user.password = undefined
          res.status(201).json({
              success: true,
              message: "User created successfully",
              user
          })
        
    } catch (error) {
        console.log(error)
        console.log(error.message)
    }
}

module.exports = {registerUser}