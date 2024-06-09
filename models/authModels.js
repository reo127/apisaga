const mongoose = require("mongoose");
const {
    AvailableSocialLogins,
    AvailableUserRoles,
    USER_TEMPORARY_TOKEN_EXPIRY,
    UserLoginType,
    UserRolesEnum,
} = require("../utils/constants");

const authuser = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      role: {
        type: String,
        enum: AvailableUserRoles,
        default: UserRolesEnum.USER,
        required: true,
      },
      loginType: {
        type: String,
        enum: AvailableSocialLogins,
        default: UserLoginType.EMAIL_PASSWORD,
      },
      isEmailVerified: {
        type: Boolean,
        default: false,
      },
      refreshToken: {
        type: String,
        default: ""
      },
      forgotPasswordToken: {
        type: String,
      },
      forgotPasswordExpiry: {
        type: Date,
      },
      emailVerificationToken: {
        type: String,
      },
      emailVerificationExpiry: {
        type: Date,
      },
}, { timestamps: true });

authuser.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

authuser.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "24h" }
  );
};


module.exports = mongoose.model("AuthUser", authuser);