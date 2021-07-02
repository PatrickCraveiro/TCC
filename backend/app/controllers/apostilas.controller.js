const Apostilas = require("..//models//apostilas.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Apostilas
  const apostilas = new Apostilas({
    idEntidade: req.body.idEntidade,
    anoAtual: req.body.anoAtual,
    idMaterialAnoAnterior: req.body.idMaterialAnoAnterior,
    idMaterialAnoAtual: req.body.idMaterialAnoAtual,
    nome: req.body.nome,
    titulo: req.body.titulo,
    dataAula: req.body.dataAula,
    versaoOriginal: req.body.versaoOriginal,
    anoImagensPorEntidade: req.body.anoImagensPorEntidade,
    versaoOriginal2022: req.body.versaoOriginal2022,
    fk_idEspecialidade: req.body.fk_idEspecialidade,
  });

  // Save Apostilas in the database
  Apostilas.create(apostilas, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Apostilas.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Apostilas.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving apostilass.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Apostilas.findById(req.params.apostilasidEntidade, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Apostilas with idEntidade ${req.params.apostilasidEntidade}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Apostilas with idEntidade " + req.params.apostilasidEntidade,
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

  Apostilas.updateById(
    req.params.apostilasidEntidade,
    new Apostilas(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Apostilas with idEntidade ${req.params.apostilasidEntidade}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Apostilas with idEntidade " + req.params.apostilasidEntidade,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Apostilas.remove(req.params.apostilasidEntidade, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Apostilas with idEntidade ${req.params.apostilasidEntidade}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Apostilas with idEntidade " + req.params.apostilasidEntidade,
        });
      }
    } else res.send({ message: `Apostilas was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Apostilas.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all apostilass.",
      });
    else res.send({ message: `All Apostilass were deleted successfully!` });
  });
};
