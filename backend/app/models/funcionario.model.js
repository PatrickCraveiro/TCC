const sql = require(".//db.js");

// constructor
const funcionario = function(funcionario) {
  this.nome = funcionario.nome
  this.email = funcionario.email;
  this.idClinica = funcionario.idClinica;
  this.cargo = funcionario.cargo;
};

funcionario.create = (newfuncionario, result) => {
  sql.query("INSERT INTO funcionario SET ?", newfuncionario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created funcionario: ", { id: res.insertId, ...newfuncionario });
    result(null, { id: res.insertId, ...newfuncionario });
  });
};

funcionario.findById = (funcionarioId, result) => {
  sql.query(`SELECT * FROM funcionario WHERE id = ${funcionarioId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found funcionario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found funcionario with the id
    result({ kind: "not_found" }, null);
  });
};

funcionario.getAll = result => {
  sql.query("SELECT * FROM funcionario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("funcionario: ", res);
    result(null, res);
  });
};

funcionario.updateById = (id, funcionario, result) => {
  sql.query(
    "UPDATE funcionario SET email = ?, name = ?, active = ? WHERE id = ?",
    [funcionario.email, funcionario.name, funcionario.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found funcionario with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated funcionario: ", { id: id, ...funcionario });
      result(null, { id: id, ...funcionario });
    }
  );
};

funcionario.remove = (id, result) => {
  sql.query("DELETE FROM funcionario WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found funcionario with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted funcionario with id: ", id);
    result(null, res);
  });
};

funcionario.removeAll = result => {
  sql.query("DELETE FROM funcionario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} funcionario`);
    result(null, res);
  });
};

module.exports = funcionario;