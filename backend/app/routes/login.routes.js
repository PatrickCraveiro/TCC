module.exports = app => {
    const Login = require("../controllers/login.controller.js");
  
    // Create a new Login
    app.post("/Login", Login.create);
  
    // Retrieve all Logins
    app.get("/Login", Login.findAll);
  
    // Retrieve a single Login with loginId
    app.get("/Login/:loginId", Login.findOne);
  
    // Update a Login with loginId
    app.put("/Login/:loginId", Login.update);
  
    // Delete a Login with loginId
    app.delete("/Login/:loginId", Login.delete);
  
    // Create a new Login
    app.delete("/Login", Login.deleteAll);
  };