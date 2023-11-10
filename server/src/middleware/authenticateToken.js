const jwt = require("jsonwebtoken");
const { prisma } = require("../database/client");
const config = require("../configs/config");
const { logger } = require("../utils/logger");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer Token

  if (token == null) {
    return res.sendError(401, 1000, "Token is required");
  }

  try {
    const session = await prisma.session.findFirst({
      where: { token: token, expiresAt: { gt: new Date()}},
    });

    if (!session) {
      return res.sendError(403, 1001, "Session token not found or has expired.");
    }

    jwt.verify(token, config.jwt_secret, (err, user) => {
      if (err) {
        return res.sendError(403, 1002, "Invalid token");
      }
      req.user = user;
      next();
    });
  } catch (error) {
    logger.errorf("Error when checking token against sessions: %v", error);
    return res.sendError(500, -1, "Internal Server Error");
  }
};

module.exports = authenticateToken;
