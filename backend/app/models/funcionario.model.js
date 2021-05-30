const sql = require(".//db.js");

// constructor
const Funcionario = function(funcionario) {
  this.nome = funcionario.nome
  this.email = funcionario.email;
  this.idClinica = funcionario.idClinica;
  this.cargo = funcionario.cargo;
};

Funcionario.create = (newFuncionario, result) => {
  sql.query("INSERT INTO funcionario SET ?", newFuncionario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created funcionario: ", { id: res.insertId, ...newFuncionario });
    result(null, { id: res.insertId, ...newFuncionario });
  });
};

Funcionario.findById = (funcionarioId, result) => {
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

    // not found Funcionario with the id
    result({ kind: "not_found" }, null);
  });
};

Funcionario.getAll = result => {
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

Funcionario.updateById = (id, funcionario, result) => {
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
        // not found Funcionario with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated funcionario: ", { id: id, ...funcionario });
      result(null, { id: id, ...funcionario });
    }
  );
};

Funcionario.remove = (id, result) => {
  sql.query("DELETE FROM funcionario WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Funcionario with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted funcionario with id: ", id);
    result(null, res);
  });
};

Funcionario.removeAll = result => {
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

module.exports = Funcionario;