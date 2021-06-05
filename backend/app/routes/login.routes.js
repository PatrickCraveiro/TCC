module.exports = app => {
    const login = require("..//controllers//login.controller.js");
  
    // Create a new login
    app.post("/login", login.create);
  
    // Retrieve all logins
    app.get("/login", login.findAll);
  
    // Retrieve a single login with loginId
    app.get("/login/:loginlogin", login.findOne);
  
    // Update a login with loginlogin
    app.put("/login/:loginlogin", login.update);
  
    // Delete a login with loginlogin
    app.delete("/login/:loginlogin", login.delete);
  
    // Create a new login
    app.delete("/login", login.deleteAll);
  };