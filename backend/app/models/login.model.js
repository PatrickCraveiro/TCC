const sql = require(".//db.js");

// constructor
const Login = function(login) {
  this.LOGIN = login.LOGIN;
  this.senha = login.senha;
  this.email = login.email;
  this.adm = login.adm;
};

Login.create = (newLogin, result) => {
  sql.query("INSERT INTO login SET ?", newLogin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created login: ", { LOGIN: res.insertLOGIN, ...newLogin });
    result(null, { LOGIN: res.insertLOGIN, ...newLogin });
  });
};

Login.findById = (loginLOGIN, result) => {
  sql.query(`SELECT * FROM login WHERE LOGIN = ${loginLOGIN}`, (err, res) => {
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

Login.updateById = (LOGIN, login, result) => {
  sql.query(
    "UPDATE login SET LOGIN = ?, senha = ?, email = ?, adm = ? WHERE login = ?",
    [login.LOGIN, login.senha, login.email, login.adm, LOGIN],
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

      console.log("updated login: ", { LOGIN: LOGIN, ...login });
      result(null, { LOGIN: LOGIN, ...login });
    }
  );
};

Login.remove = (LOGIN, result) => {
  sql.query("DELETE FROM login WHERE LOGIN = ?", LOGIN, (err, res) => {
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

    console.log("deleted login with LOGIN: ", LOGIN);
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