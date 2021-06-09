module.exports = app => {
    const funcionario = require("../controllers/funcionario.controller.js");
  
    // Create a new Clinica
    app.post("/funcionario", funcionario.create);
  
    // Retrieve all Clinica
    app.get("/funcionario", funcionario.findAll);
  
    // Retrieve a single Clinica with funcionarioID
    app.get("/funcionario/:funcionarioID", funcionario.findOne);
  
    // Update a Clinica with funcionarioID
    app.put("/funcionario/:funcionarioID", funcionario.update);
  
    // Delete a Clinica with funcionarioID
    app.delete("/funcionario/:funcionarioID", funcionario.delete);
  
    // Create a new Clinica
    app.delete("/funcionario", funcionario.deleteAll);
  };