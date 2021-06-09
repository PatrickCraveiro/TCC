module.exports = app => {
    const funcionario = require("..//controllers//funcionario.controller.js");
  
    // Create a new Funcionario
    app.post("/funcionario", funcionario.create);
  
    // Retrieve all Funcionario
    app.get("/funcionario", funcionario.findAll);
  
    // Retrieve a single Funcionario with funcionarioId
    app.get("/funcionario/:funcionarioID", funcionario.findOne);
  
    // Update a Funcionario with funcionarioId
    app.put("/funcionario/:funcionarioID", funcionario.update);
  
    // Delete a Funcionario with funcionarioId
    app.delete("/funcionario/:funcionarioID", funcionario.delete);
  
    // Create a new Funcionario
    app.delete("/funcionario", funcionario.deleteAll);
  };