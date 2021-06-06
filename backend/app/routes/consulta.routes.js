module.exports = app => {
    const consulta = require("..//controllers//consulta.controller.js");
  
    // Create a new Consulta
    app.post("/consulta", consulta.create);
  
    // Retrieve all Consulta
    app.get("/consulta", consulta.findAll);
  
    // Retrieve a single Consulta with consultaId
    app.get("/consulta/:consultaID", consulta.findOne);
  
    // Update a Consulta with consultaId
    app.put("/consulta/:consultaID", consulta.update);
  
    // Delete a Consulta with consultaId
    app.delete("/consulta/:consultaID", consulta.delete);
  
    // Create a new Consulta
    app.delete("/consulta", consulta.deleteAll);
  };