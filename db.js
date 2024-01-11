const mongoose = require("mongoose");
require("dotenv").config();
const uriDB = process.env.DB_HOST;

mongoose
  .connect(uriDB)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(`Error message: ${error.message}`);
    process.exit(1);
  });
