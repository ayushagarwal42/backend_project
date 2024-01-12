const mongoose = require('mongoose');
 
mongoose.connect("mongodb://0.0.0.0:27017/Nodejs_backend")
  .then(() => {
    console.log("Database Connected...");
  })
  .catch((error) => {
    console.log("Database cannot be connected: " + error);
  });