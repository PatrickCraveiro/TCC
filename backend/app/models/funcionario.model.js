const sql = require(".//db.js");

// constructor
const funcionario = function(funcionario) {
  this.ID = funcionario.ID;
  this.nomeFuncionario = funcionario.nomeFuncionario;
  this.emailFuncionario = funcionario.emailFuncionario;
  this.cargoFuncionario = funcionario.cargoFuncionario;
  this.clinicaCNPJ = funcionario.clinicaCNPJ;
  this.nomeClinica = funcionario.nomeClinica;
  this.idClinica = funcionario.idClinica;
  this.dataContracao = funcionario.dataContracao;
};

funcionario.create = (newfuncionario, result) => {
  sql.query("INSERT INTO funcionario SET ?", newfuncionario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created funcionario: ", { ID: res.insertId, ...newfuncionario });
    result(null, { ID: res.insertId, ...newfuncionario });
  });
};

funcionario.findById = (funcionarioId, result) => {
  sql.query(`SELECT * FROM funcionario WHERE ID = ${funcionarioId}`, (err, res) => {
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
funcionario.updateById = (ID, funcionario, result) => {
  sql.query(
    "UPDATE funcionario SET ID = ?, nomeFuncionario = ?, emailFuncionario = ?, cargoFuncionario = ?, clinicaCNPJ = ?, nomeClinica = ?, idClinica = ? dataContraca = ? WHERE ID = ?",
    [funcionario.nomeFuncionario, funcionario.emailFuncionario, funcionario.cargoFuncionario, funcionario.clinicaCNPJ, funcionario.nomeClinica, funcionario.idClinica, funcionario.dataContracao, ID],
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

      console.log("updated funcionario: ", { ID: ID, ...funcionario });
      result(null, { ID: ID, ...funcionario });
    }
  );
};

funcionario.remove = (ID, result) => {
  sql.query("DELETE FROM funcionario WHERE ID = ?", ID, (err, res) => {
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

    console.log("deleted funcionario with ID: ", ID);
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