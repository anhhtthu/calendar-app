const jwt = require("jsonwebtoken");
const config = require("../configs/config");
const { prisma } = require("../database/client");
const CustomError = require("../utils/customError");
const ERROR_CODE = require("../constants/errorCode");
const moment = require("moment");

exports.generateAccessToken = async (userId) => {
  return jwt.sign({ userId }, config.jwt_secret, {
    expiresIn: config.expires_token,
  });
};

exports.generateRefreshToken = async (userId) => {
  return jwt.sign({ userId }, config.refresh_token_secret, {
    expiresIn: config.expires_refresh_token,
  });
};

exports.storedRefreshToken = async (userId, refreshToken) => {
  let expiresDate = moment().add(7, "days").toDate();
  await prisma.session.create({
    data: {
      userId: userId,
      refreshToken: refreshToken,
      expiresAt: expiresDate,
    },
  });
};

exports.verifyRefreshToken = async (refreshToken) => {
  const session = await prisma.session.findUnique({
    where: { refreshToken: refreshToken },
  });

  if (!session) {
    throw new CustomError(
      400,
      ERROR_CODE.TOKEN_INVALID,
      "Invalid refresh token"
    );
  }

  return jwt.verify(refreshToken, config.refresh_token_secret);
};

exports.invalidateToken = async (refreshToken) => {
  await prisma.session.delete({
    where: { refreshToken: refreshToken },
  });
};
