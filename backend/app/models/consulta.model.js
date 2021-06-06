const sql = require(".//db.js");

// constructor
const Consulta = function (consulta) {
  this.ID = consulta.ID;
  this.loginPaciente = consulta.loginPaciente;
  this.clinicaCNPJ = consulta.clinicaCNPJ;
  this.nomeClinica = consulta.nomeClinica;
  this.dataAtendimento = consulta.dataAtendimento;
  this.horarioAtendimento = consulta.horarioAtendimento;
};

Consulta.create = (newConsulta, result) => {
  sql.query("INSERT INTO consulta SET ?", newConsulta, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created consulta: ", { ID: res.insertID, ...newConsulta });
    result(null, { ID: res.insertID, ...newConsulta });
  });
};

Consulta.findById = (consultaID, result) => {
  sql.query(
    `SELECT * FROM consulta WHERE ID = ${consultaID}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found consulta: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Consulta with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Consulta.getAll = (result) => {
  sql.query("SELECT * FROM consulta", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("consulta: ", res);
    result(null, res);
  });
};
this.ID = consulta.ID;
this.loginPaciente = consulta.loginPaciente;
this.clinicaCNPJ = consulta.clinicaCNPJ;
this.nomeClinica = consulta.nomeClinica;
this.dataAtendimento = consulta.dataAtendimento;
this.horarioAtendimento = consulta.horarioAtendimento;
Consulta.updateById = (ID, consulta, result) => {
  sql.query(
    "UPDATE consulta SET ID = ?, SET loginPaciente = ?, SET consulta.clinicaCNPJ = ?, SET nomeClinica = ?, SET dataAtendimento = ?, horarioAtendimento = ? WHERE ID = ?",
    [consulta.ID, consulta.loginPaciente, consulta.clinicaCNPJ, consulta.nomeClinica, consulta.dataAtendimento, consulta.horarioAtendimento, ID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Consulta with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated consulta: ", { ID: ID, ...consulta });
      result(null, { ID: ID, ...consulta });
    }
  );
};

Consulta.remove = (ID, result) => {
  sql.query("DELETE FROM consulta WHERE ID = ?", ID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Consulta with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted consulta with ID: ", ID);
    result(null, res);
  });
};

Consulta.removeAll = (result) => {
  sql.query("DELETE FROM consulta", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} consulta`);
    result(null, res);
  });
};

module.exports = Consulta;
