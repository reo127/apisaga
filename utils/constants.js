
/**
 * @type {{ ADMIN: "ADMIN"; USER: "USER"} as const}
 */
const UserRolesEnum = {
    ADMIN: "ADMIN",
    USER: "USER",
  };
  
const AvailableUserRoles = Object.values(UserRolesEnum);



/**
 * @type {{ GOOGLE: "GOOGLE"; GITHUB: "GITHUB"; EMAIL_PASSWORD: "EMAIL_PASSWORD"} as const}
 */
const UserLoginType = {
    GOOGLE: "GOOGLE",
    GITHUB: "GITHUB",
    EMAIL_PASSWORD: "EMAIL_PASSWORD",
  };
  
const AvailableSocialLogins = Object.values(UserLoginType);


const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes

module.exports = {UserRolesEnum, AvailableSocialLogins, AvailableUserRoles, UserLoginType, AvailableSocialLogins}

