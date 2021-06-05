const Clinica = require("..//models//clinica.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Clinica
    const clinica = new Clinica({
      CNPJ: req.body.CNPJ,
      nome: req.body.nome,
      cidade: req.body.cidade,
    });
  
    // Save Clinica in the database
    Clinica.create(clinica, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Clinica."
        });
      else res.send(data);
    });
  };


  exports.findAll = (req, res) => {
    Clinica.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving clinicas."
        });
      else res.send(data);
    });
  };


  exports.findOne = (req, res) => {
    Clinica.findById(req.params.clinicaCNPJ, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Clinica with CNPJ ${req.params.clinicaCNPJ}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Clinica with CNPJ " + req.params.clinicaCNPJ
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Clinica.updateById(
      req.params.clinicaCNPJ,
      new Clinica(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Clinica with CNPJ ${req.params.clinicaCNPJ}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Clinica with CNPJ " + req.params.clinicaCNPJ
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Clinica.remove(req.params.clinicaCNPJ, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Clinica with CNPJ ${req.params.clinicaCNPJ}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Clinica with CNPJ " + req.params.clinicaCNPJ
          });
        }
      } else res.send({ message: `Clinica was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Clinica.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all clinicas."
        });
      else res.send({ message: `All Clinicas were deleted successfully!` });
    });
  };