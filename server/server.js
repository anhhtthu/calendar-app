const app = require("./src/app");
const logger = require("./src/utils/logger");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.infof("Server is running on http://localhost:%d", PORT);
});
