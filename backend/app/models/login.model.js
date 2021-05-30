const sql = require("./db.js");

// constructor
const Login = function(login) {
  this.login = login.login;
  this.senha = login.senha;
  this.email = login.email;
  this.email = login.adm;
};

Login.create = (newLogin, result) => {
  sql.query("INSERT INTO Login SET ?", newLogin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created login: ", { id: res.insertId, ...newLogin });
    result(null, { id: res.insertId, ...newLogin });
  });
};

Login.findById = (loginId, result) => {
  sql.query(`SELECT * FROM Login WHERE id = ${loginId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found login: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Login with the id
    result({ kind: "not_found" }, null);
  });
};

Login.getAll = result => {
  sql.query("SELECT * FROM Login", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Login: ", res);
    result(null, res);
  });
};

Login.updateById = (id, login, result) => {
  sql.query(
    "UPDATE Login SET login = ?, senha = ?, email = ? WHERE id = ?",
    [login.login, login.senha, login.email, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Login with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated login: ", { id: id, ...login });
      result(null, { id: id, ...login });
    }
  );
};

Login.remove = (id, result) => {
  sql.query("DELETE FROM Login WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Login with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted login with id: ", id);
    result(null, res);
  });
};

Login.removeAll = result => {
  sql.query("DELETE FROM Login", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Login`);
    result(null, res);
  });
};

module.exports = Login;