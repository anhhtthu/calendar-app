const bcrypt = require("bcrypt");
const { prisma } = require("../database/client");
const CustomError = require("../utils/customError");
const ERROR_CODE = require("../constants/errorCode");

exports.validateUserCredentials = async (usernameOrEmail, password) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: usernameOrEmail }, { userName: usernameOrEmail }],
    },
  });

  if (!user) {
    throw new CustomError(404, ERROR_CODE.USER_NOT_FOUND, "User not found");
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash);
  if (!passwordValid) {
    throw new CustomError(
      401,
      ERROR_CODE.CREDENTIALS_INVALID,
      "Invalid Password"
    );
  }

  return user;
};
