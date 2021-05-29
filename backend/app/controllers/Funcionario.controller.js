const Funcionario = require("../models/funcionario.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const funcionario = new Funcionario({
    id: req.body.id,
    email: req.body.email,
    nome: req.body.nome,
    cargo: req.body.cargo
  });

  // Save Customer in the database
  Funcionario.create(funcionario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Funcionario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Funcionarios."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  Funcionario.findById(req.params.funcionarioId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.funcionarioId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.funcionarioId
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

  Funcionario.updateById(
    req.params.funcionarioId,
    new Funcionario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.funcionarioId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.funcionarioId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Funcionario.remove(req.params.funcionarioId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.funcionarioId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.funcionarioId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Funcionario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};