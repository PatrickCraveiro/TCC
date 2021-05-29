module.exports = app => {
    const logins = require("../controllers/login.controller.js");
  
    // Create a new Login
    app.post("/logins", logins.create);
  
    // Retrieve all Logins
    app.get("/logins", logins.findAll);
  
    // Retrieve a single Login with loginId
    app.get("/logins/:loginId", logins.findOne);
  
    // Update a Login with loginId
    app.put("/logins/:loginId", logins.update);
  
    // Delete a Login with loginId
    app.delete("/logins/:loginId", logins.delete);
  
    // Create a new Login
    app.delete("/logins", logins.deleteAll);
  };