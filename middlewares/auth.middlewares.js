const Auth = require("../models/authModels")
const jwt = require("jsonwebtoken")

const varifJWT = async (req, res, next) => {
    try {
        
        const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
        console.log(token)
      if (!token) {
        return res.status(401).json("Token not found")
      }
    
      try {
          const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          const user = await Auth.findById(decodedToken?._id).select(
              "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
              );

        if (!user) {
          // Client should make a request to /api/v1/users/refresh-token if they have refreshToken present in their cookie
          // Then they will get a new access token which will allow them to refresh the access token without logging out the user
          return res.status(401).json("Invalid access token")
        }
        req.user = user;
        next();
      } catch (error) {
        // Client should make a request to /api/v1/users/refresh-token if they have refreshToken present in their cookie
        // Then they will get a new access token which will allow them to refresh the access token without logging out the user
        return res.status(401).json(error?.message || "Invalid access token")
      }

    } catch (error) {
        return res.status(401).json(error?.message || "something went wrong")
    }
}

module.exports = {varifJWT}