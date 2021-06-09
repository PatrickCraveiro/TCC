const Funcionario = require("../models/funcionario.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Clinica
  const funcionario = new Funcionario({
    ID: req.body.ID,
    cpfFuncionario: req.body.cpfFuncionario,
    nomeFuncionario: req.body.nomeFuncionario,
    emailFuncionario: req.body.emailFuncionario,
    cargoFuncionario: req.body.cargoFuncionario,
    clinicaCNPJ: req.body.clinicaCNPJ,
    nomeClinica: req.body.nomeClinica,
    dataContracao: req.body.dataContracao,
  });

  // Save Clinica in the database
  Funcionario.create(funcionario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Clinica.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Funcionario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving funcionarios.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Funcionario.findById(req.params.funcionarioID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Funcionario with ID ${req.params.funcionarioID}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Funcionario with ID " + req.params.funcionarioID,
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

  Funcionario.updateById(
    req.params.funcionarioID,
    new Funcionario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Funcionario with ID ${req.params.funcionarioID}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Funcionario with ID " + req.params.funcionarioID,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Funcionario.remove(req.params.funcionarioID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Funcionario with ID ${req.params.funcionarioID}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Funcionario with ID " + req.params.funcionarioID,
        });
      }
    } else res.send({ message: `Funcionario was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Funcionario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all clinica.",
      });
    else res.send({ message: `All Funcionario were deleted successfully!` });
  });
};
