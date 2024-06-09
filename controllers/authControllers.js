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

// Genarate Access and Refresh tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await Auth.findById(userId);

    const accessToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "24h" }
    );



    // attach refresh token to the user document to avoid refreshing the access token with multiple refresh tokens
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(
      500,
      "Something went wrong while generating the access token"
    );
  }
};

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


/*
@Paramiters : email, username, password
*/
const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!username && !email) {
      throw new Error(400, "Username or email is required");
    }

    const user = await Auth.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      throw new Error(404, "User does not exist");
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      throw new Error('Worng password, Try again');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    // get the user document ignoring the password and refreshToken field
    const loggedInUser = await Auth.findById(user._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    // TODO: Add more options to make cookie more secure and reliable
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options) // set the access token in the cookie
      .cookie("refreshToken", refreshToken, options) // set the refresh token in the cookie
      .json({ user: loggedInUser, accessToken, refreshToken, message: "User logged in successfully" }); // send access and refresh token in response if client decides to save them by themselves 

  } catch (error) {
    console.log(error)
    console.log(error.message)
  }
}

const logout = async(req, res) => {
  try {
    await Auth.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: '',
        },
      },
      { new: true }
    );
  
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({message: "User logged out"});

  } catch (error) {
    console.log(error)
    console.log(error.message)
  }
}

module.exports = { registerUser, login, logout }