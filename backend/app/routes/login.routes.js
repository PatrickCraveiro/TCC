module.exports = app => {
    const login = require("../controllers/login.controller.js");
  
    // Create a new login
    app.post("/login", login.create);
  
    // Retrieve all logins
    app.get("/login", login.findAll);
  
    // Retrieve a single login with loginId
    app.get("/login/:loginId", login.findOne);
  
    // Update a login with loginId
    app.put("/login/:loginId", login.update);
  
    // Delete a login with loginId
    app.delete("/login/:loginId", login.delete);
  
    // Create a new login
    app.delete("/login", login.deleteAll);
  };