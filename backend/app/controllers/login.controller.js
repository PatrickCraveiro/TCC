const login = require("..//models//login.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a login
    const login = new login({
      login: req.body.login,
      senha: req.body.senha,
      email: req.body.email,
      adm: req.body.adm
    });
  
    // Save login in the database
    login.create(login, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the login."
        });
      else res.send(data);
    });
  };


  exports.findAll = (req, res) => {
    login.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving logins."
        });
      else res.send(data);
    });
  };


  exports.findOne = (req, res) => {
    login.findById(req.params.loginId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found login with id ${req.params.loginId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving login with id " + req.params.loginId
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
  
    login.updateById(
      req.params.loginId,
      new login(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found login with id ${req.params.loginId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating login with id " + req.params.loginId
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    login.remove(req.params.loginId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found login with id ${req.params.loginId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete login with id " + req.params.loginId
          });
        }
      } else res.send({ message: `login was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    login.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all logins."
        });
      else res.send({ message: `All logins were deleted successfully!` });
    });
  };