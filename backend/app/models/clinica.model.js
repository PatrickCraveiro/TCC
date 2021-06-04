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

    console.log("created clinica: ", { id: res.insertId, ...newClinica });
    result(null, { id: res.insertId, ...newClinica });
  });
};

Clinica.findById = (clinicaId, result) => {
  sql.query(`SELECT * FROM clinica WHERE id = ${clinicaId}`, (err, res) => {
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

Clinica.updateById = (id, clinica, result) => {
  sql.query(
    "UPDATE clinica SET email = ?, nome = ?, cidade = ? WHERE id = ?",
    [clinica.CNPJ, clinica.nome, clinica.cidade, id],
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

      console.log("updated clinica: ", { id: id, ...clinica });
      result(null, { id: id, ...clinica });
    }
  );
};

Clinica.remove = (id, result) => {
  sql.query("DELETE FROM clinica WHERE id = ?", id, (err, res) => {
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

    console.log("deleted clinica with id: ", id);
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