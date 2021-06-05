module.exports = app => {
    const login = require("..//controllers//login.controller.js");
  
    // Create a new login
    app.post("/login", login.create);
  
    // Retrieve all logins
    app.get("/login", login.findAll);
  
    // Retrieve a single login with loginId
    app.get("/login/:loginLOGIN", login.findOne);
  
    // Update a login with loginlogin
    app.put("/login/:loginLOGIN", login.update);
  
    // Delete a login with loginlogin
    app.delete("/login/:loginLOGIN", login.delete);
  
    // Create a new login
    app.delete("/login", login.deleteAll);
  };