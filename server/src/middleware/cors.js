const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

module.exports = cors(corsOptions);
