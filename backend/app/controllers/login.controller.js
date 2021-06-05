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
    login: req.body.login,
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
  Login.findById(req.params.loginlogin, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found login with login ${req.params.loginlogin}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving login with login " + req.params.loginlogin,
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

  Login.updateById(req.params.loginlogin, new Login(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found login with login ${req.params.loginlogin}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating login with login " + req.params.loginlogin,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Login.remove(req.params.loginlogin, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found login with login ${req.params.loginlogin}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete login with login " + req.params.loginlogin,
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
