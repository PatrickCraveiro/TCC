const sql = require(".//db.js");

// constructor
const Login = function(login) {
  this.login = login.login;
  this.senha = login.senha;
  this.email = login.email;
  this.email = login.adm;
};

Login.create = (newLogin, result) => {
  sql.query("INSERT INTO login SET ?", newLogin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created login: ", { login: res.insertlogin, ...newLogin });
    result(null, { login: res.insertlogin, ...newLogin });
  });
};

Login.findById = (loginlogin, result) => {
  sql.query(`SELECT * FROM login WHERE login = ${loginlogin}`, (err, res) => {
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

    // not found login with the id
    result({ kind: "not_found" }, null);
  });
};

Login.getAll = result => {
  sql.query("SELECT * FROM login", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("login: ", res);
    result(null, res);
  });
};

Login.updateById = (login, login, result) => {
  sql.query(
    "UPDATE login SET login = ?, senha = ?, email = ?, adm = ? WHERE login = ?",
    [login.login, login.senha, login.email, login.adm, login],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found login with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated login: ", { login: login, ...login });
      result(null, { login: login, ...login });
    }
  );
};

Login.remove = (login, result) => {
  sql.query("DELETE FROM login WHERE login = ?", login, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found login with the login
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted login with login: ", login);
    result(null, res);
  });
};

Login.removeAll = result => {
  sql.query("DELETE FROM login", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} login`);
    result(null, res);
  });
};

module.exports = Login;