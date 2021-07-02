module.exports = app => {
    const apostilas_info = require("../controllers/apostilas_info.controller.js");
  
    // Create a new Apostilas_info
    app.post("/apostilas_info", apostilas_info.create);
  
    // Retrieve all Apostilas_info
    app.get("/apostilas_info", apostilas_info.findAll);
  
    // Retrieve a single Apostilas_info with apostilas_infoId
    app.get("/apostilas_info/:apostilas_infoinfo", apostilas_info.findOne);
  
    // Update a Apostilas_info with apostilas_infoId
    app.put("/apostilas_info/:apostilas_infoinfo", apostilas_info.update);
  
    // Delete a Apostilas_info with apostilas_infoId
    app.delete("/apostilas_info/:apostilas_infoinfo", apostilas_info.delete);
  
    // Create a new Apostilas_info
    app.delete("/apostilas_info", apostilas_info.deleteAll);
  };