module.exports = app => {
    const consulta = require("..//controllers//consulta.controller.js");
  
    // Create a new Consulta
    app.post("/consulta", consulta.create);
  
    // Retrieve all Consulta
    app.get("/consulta", consulta.findAll);
  
    // Retrieve a single Consulta with consultaId
    app.get("/consulta/:consultaCNPJ", consulta.findOne);
  
    // Update a Consulta with consultaId
    app.put("/consulta/:consultaCNPJ", consulta.update);
  
    // Delete a Consulta with consultaId
    app.delete("/consulta/:consultaCNPJ", consulta.delete);
  
    // Create a new Consulta
    app.delete("/consulta", consulta.deleteAll);
  };