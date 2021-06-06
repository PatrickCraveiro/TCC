const Consulta = require("..//models//consulta.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Consulta
  const consulta = new Consulta({
    ID: req.body.ID,
    loginPaciente: req.body.loginPaciente,
    clinicaCNPJ: req.body.clinicaCNPJ,
    nomeClinica: req.body.nomeClinica,
    dataAtendimento: req.body.dataAtendimento,
    horarioAtendimento: req.body.horarioAtendimento,
  });

  // Save Consulta in the database
  Consulta.create(consulta, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Consulta.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Consulta.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving consultas.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Consulta.findById(req.params.consultaID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Consulta with ID ${req.params.consultaID}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Consulta with ID " + req.params.consultaID,
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

  Consulta.updateById(
    req.params.consultaID,
    new Consulta(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Consulta with ID ${req.params.consultaID}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Consulta with ID " + req.params.consultaID,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Consulta.remove(req.params.consultaID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Consulta with ID ${req.params.consultaID}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Consulta with ID " + req.params.consultaID,
        });
      }
    } else res.send({ message: `Consulta was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Consulta.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all consultas.",
      });
    else res.send({ message: `All Consultas were deleted successfully!` });
  });
};
