const Login = require("../models/login.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Login
    const login = new Login({
      email: req.body.email,
      name: req.body.name,
      active: req.body.active
    });
  
    // Save Login in the database
    Login.create(login, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Login."
        });
      else res.send(data);
    });
  };


  exports.findAll = (req, res) => {
    Login.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving logins."
        });
      else res.send(data);
    });
  };


  exports.findOne = (req, res) => {
    Login.findById(req.params.loginId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Login with id ${req.params.loginId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Login with id " + req.params.loginId
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
  
    Login.updateById(
      req.params.loginId,
      new Login(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Login with id ${req.params.loginId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Login with id " + req.params.loginId
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Login.remove(req.params.loginId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Login with id ${req.params.loginId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Login with id " + req.params.loginId
          });
        }
      } else res.send({ message: `Login was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Login.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all logins."
        });
      else res.send({ message: `All Logins were deleted successfully!` });
    });
  };