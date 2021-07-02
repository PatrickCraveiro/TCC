module.exports = app => {
    const produto = require("..//controllers//produto.controller.js");
  
    // Create a new Produto
    app.post("/produto", produto.create);
  
    // Retrieve all Produto
    app.get("/produto", produto.findAll);
  
    // Retrieve a single Produto with produtoId
    app.get("/produto/:produtoidProduto", produto.findOne);
  
    // Update a Produto with produtoId
    app.put("/produto/:produtoidProduto", produto.update);
  
    // Delete a Produto with produtoId
    app.delete("/produto/:produtoidProduto", produto.delete);
  
    // Create a new Produto
    app.delete("/produto", produto.deleteAll);
  };