module.exports = app => {
    const clinica = require("..//controllers//clinica.controller.js");
  
    // Create a new Clinica
    app.post("/clinica", clinica.create);
  
    // Retrieve all Clinica
    app.get("/clinica", clinica.findAll);
  
    // Retrieve a single Clinica with clinicaId
    app.get("/clinica/:clinicaCNPJ", clinica.findOne);
  
    // Update a Clinica with clinicaId
    app.put("/clinica/:clinicaCNPJ", clinica.update);
  
    // Delete a Clinica with clinicaId
    app.delete("/clinica/:clinicaCNPJ", clinica.delete);
  
    // Create a new Clinica
    app.delete("/clinica", clinica.deleteAll);
  };