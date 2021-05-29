module.exports = app => {
    const funcionario = require("../controllers/funcionario.controller.js");
  
    // Create a new Customer
    app.post("/funcionario", funcionario.create);
  
    // Retrieve all Customers
    app.get("/funcionario", funcionario.findAll);
  
    // Retrieve a single Customer with funcionarioId
    app.get("/funcionario/:funcionarioId", funcionario.findOne);
  
    // Update a Customer with funcionarioId
    app.put("/funcionario/:funcionarioId", funcionario.update);
  
    // Delete a Customer with funcionarioId
    app.delete("/funcionario/:funcionarioId", funcionario.delete);
  
    // Create a new Customer
    app.delete("/funcionario", funcionario.deleteAll);
  };