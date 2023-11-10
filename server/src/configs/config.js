require("dotenv").config();

const config = {
  port: process.env.PORT || 3001,
  database_url: process.env.DATABASE_URL,
  base_url: process.env.BASE_URL,
  jwt_secret: process.env.JWT_SECRET
};

module.exports = config;
