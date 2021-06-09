const sql = require(".//db.js");

// constructor
const Funcionario = function (funcionario) {
  this.ID = funcionario.ID;
  this.cpfFuncionario = funcionario.cpfFuncionario;
  this.nomeFuncionario = funcionario.nomeFuncionario;
  this.cargoFuncionario = funcionario.cargoFuncionario;
  this.clinicaCNPJ = funcionario.clinicaCNPJ;
  this.nomeClinica = funcionario.nomeClinica;
  this.dataContracao = funcionario.dataContracao;
};

Funcionario.create = (newFuncionario, result) => {
  sql.query("INSERT INTO funcionario SET ?", newFuncionario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created funcionario: ", {
      ID: res.insertID,
      ...newFuncionario,
    });
    result(null, { ID: res.insertID, ...newFuncionario });
  });
};

Funcionario.findById = (funcionarioID, result) => {
  sql.query(
    `SELECT * FROM funcionario WHERE ID = ${funcionarioID}`,
    (err, res) => {
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
    }
  );
};

Funcionario.getAll = (result) => {
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

Funcionario.updateById = (ID, funcionario, result) => {
  sql.query(
    "UPDATE funcionario SET ID = ?, cpfFuncionario = ?, nomeFuncionario = ?, cargoFuncionario = ?, clinicaCNPJ = ?, nomeClinica = ?, dataContracao = ? WHERE ID = ?",
    [
      funcionario.ID,
      funcionario.cpfFuncionario,
      funcionario.nomeFuncionario,
      funcionario.cargoFuncionario,
      funcionario.clinicaCNPJ,
      funcionario.nomeClinica,
      funcionario.dataContracao,
      ID,
    ],
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

      console.log("updated funcionario: ", { ID: ID, ...funcionario });
      result(null, { ID: ID, ...funcionario });
    }
  );
};

Funcionario.remove = (ID, result) => {
  sql.query("DELETE FROM funcionario WHERE ID = ?", ID, (err, res) => {
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

    console.log("deleted funcionario with ID: ", ID);
    result(null, res);
  });
};

Funcionario.removeAll = (result) => {
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
