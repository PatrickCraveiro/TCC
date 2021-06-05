const sql = require(".//db.js");

// constructor
const Clinica = function(clinica) {
  this.CNPJ = clinica.CNPJ,
  this.nome = clinica.nome,
  this.cidade - clinica.cidade
};

Clinica.create = (newClinica, result) => {
  sql.query("INSERT INTO clinica SET ?", newClinica, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created clinica: ", { CNPJ: res.insertCNPJ, ...newClinica });
    result(null, { CNPJ: res.insertCNPJ, ...newClinica });
  });
};

Clinica.findById = (clinicaCNPJ, result) => {
  sql.query(`SELECT * FROM clinica WHERE CNPJ = ${clinicaCNPJ}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found clinica: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Clinica with the id
    result({ kind: "not_found" }, null);
  });
};

Clinica.getAll = result => {
  sql.query("SELECT * FROM clinica", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("clinica: ", res);
    result(null, res);
  });
};

Clinica.updateById = (CNPJ, clinica, result) => {
  sql.query(
    "UPDATE clinica SET CNPJ = ?, nome = ?, cidade = ? WHERE CNPJ = ?",
    [clinica.CNPJ, clinica.nome, clinica.cidade, CNPJ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Clinica with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated clinica: ", { CNPJ: CNPJ, ...clinica });
      result(null, { CNPJ: CNPJ, ...clinica });
    }
  );
};

Clinica.remove = (CNPJ, result) => {
  sql.query("DELETE FROM clinica WHERE CNPJ = ?", CNPJ, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Clinica with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted clinica with CNPJ: ", CNPJ);
    result(null, res);
  });
};

Clinica.removeAll = result => {
  sql.query("DELETE FROM clinica", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} clinica`);
    result(null, res);
  });
};

module.exports = Clinica;