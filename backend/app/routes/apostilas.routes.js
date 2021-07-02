module.exports = app => {
    const apostilas = require("..//controllers//apostilas.controller.js");
  
    // Create a new Apostilas
    app.post("/apostilas", apostilas.create);
  
    // Retrieve all Apostilas
    app.get("/apostilas", apostilas.findAll);
  
    // Retrieve a single Apostilas with apostilasId
    app.get("/apostilas/:apostilasidEntidade", apostilas.findOne);
  
    // Update a Apostilas with apostilasId
    app.put("/apostilas/:apostilasidEntidade", apostilas.update);
  
    // Delete a Apostilas with apostilasId
    app.delete("/apostilas/:apostilasidEntidade", apostilas.delete);
  
    // Create a new Apostilas
    app.delete("/apostilas", apostilas.deleteAll);
  };