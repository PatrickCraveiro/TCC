module.exports = app => {
    const funcionario = require("..//controllers//funcionario.controller.js");
  
    // Create a new Clinica
    app.post("/funcionario", funcionario.create);
  
    // Retrieve all Clinica
    app.get("/funcionario", funcionario.findAll);
  
    // Retrieve a single Clinica with funcionarioId
    app.get("/funcionario/:funcionarioId", funcionario.findOne);
  
    // Update a Clinica with funcionarioId
    app.put("/funcionario/:funcionarioId", funcionario.update);
  
    // Delete a Clinica with funcionarioId
    app.delete("/funcionario/:funcionarioId", funcionario.delete);
  
    // Create a new Clinica
    app.delete("/funcionario", funcionario.deleteAll);
  };