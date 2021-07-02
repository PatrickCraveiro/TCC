const Apostilas_info = require("..//models//apostilas_info.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Apostilas_info
  const apostilas_info = new Apostilas_info({
    info: req.body.info,
  });

  // Save Apostilas_info in the database
  Apostilas_info.create(apostilas_info, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Apostilas_info.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Apostilas_info.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving apostilas_infos.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Apostilas_info.findById(req.params.apostilas_infoinfo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Apostilas_info with info ${req.params.apostilas_infoinfo}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Apostilas_info with info " + req.params.apostilas_infoinfo,
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

  Apostilas_info.updateById(
    req.params.apostilas_infoinfo,
    new Apostilas_info(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Apostilas_info with info ${req.params.apostilas_infoinfo}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Apostilas_info with info " + req.params.apostilas_infoinfo,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Apostilas_info.remove(req.params.apostilas_infoinfo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Apostilas_info with info ${req.params.apostilas_infoinfo}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Apostilas_info with info " + req.params.apostilas_infoinfo,
        });
      }
    } else res.send({ message: `Apostilas_info was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Apostilas_info.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all apostilas_infos.",
      });
    else res.send({ message: `All Apostilas_infos were deleted successfully!` });
  });
};
