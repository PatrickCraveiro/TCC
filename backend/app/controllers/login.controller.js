const Login = require("..//models//login.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a login
  const login = new Login({
    LOGIN: req.body.LOGIN,
    senha: req.body.senha,
    email: req.body.email,
    adm: req.body.adm,
  });

  // Save login in the database
  Login.create(login, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the login.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Login.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving logins.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Login.findById(req.params.loginLOGIN, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found login with LOGIN ${req.params.loginLOGIN}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving login with LOGIN " + req.params.loginLOGIN,
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

  Login.updateById(req.params.loginLOGIN, new Login(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found login with LOGIN ${req.params.loginLOGIN}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating login with LOGIN " + req.params.loginLOGIN,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Login.remove(req.params.loginLOGIN, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found login with LOGIN ${req.params.loginLOGIN}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete login with LOGIN " + req.params.loginLOGIN,
        });
      }
    } else res.send({ message: `login was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Login.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all logins.",
      });
    else res.send({ message: `All logins were deleted successfully!` });
  });
};
