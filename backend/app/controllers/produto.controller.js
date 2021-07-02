const Produto = require("..//models//produto.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Produto
  const produto = new Produto({
    nome: req.body.nome,
    corHomeMeditango: req.body.corHomeMeditango,
    idProduto: req.body.idProduto,
    coresTexto: req.body.coresTexto,
    banners: req.body.banners,
  });

  // Save Produto in the database
  Produto.create(produto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Produto.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Produto.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving produtos.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Produto.findById(req.params.produtoidProduto, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produto with idProduto ${req.params.produtoidProduto}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Produto with idProduto " + req.params.produtoidProduto,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Produto.updateById(
    req.params.produtoidProduto,
    new Produto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Produto with idProduto ${req.params.produtoidProduto}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Produto with idProduto " + req.params.produtoidProduto,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Produto.remove(req.params.produtoidProduto, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produto with idProduto ${req.params.produtoidProduto}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Produto with idProduto " + req.params.produtoidProduto,
        });
      }
    } else res.send({ message: `Produto was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Produto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all produtos.",
      });
    else res.send({ message: `All Produtos were deleted successfully!` });
  });
};
