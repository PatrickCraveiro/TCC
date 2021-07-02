const sql = require(".//db.js");

// constructor
const Apostilas = function(apostilas) {
  this.idEntidade = apostilas.idEntidade;
  this.anoAtual = apostilas.anoAtual;
  this.idMaterialAnoAnterior = apostilas.idMaterialAnoAnterior;
  this.idMaterialAnoAtual = apostilas.idMaterialAnoAtual;
  this.nome = apostilas.nome;
  this.titulo = apostilas.titulo;
  this.dataAula = apostilas.dataAula;
  this.versaoOriginal = apostilas.versaoOriginal;
  this.anoImagensPorEntidade = apostilas.anoImagensPorEntidade;
  this.versaoOriginal2022 = apostilas.versaoOriginal2022;
  this.fk_idEspecialidade = apostilas.fk_idEspecialidade;
};

Apostilas.create = (newApostilas, result) => {
  sql.query("INSERT INTO apostilas SET ?", newApostilas, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created apostilas: ", { idEntidade: res.insertidEntidade, ...newApostilas });
    result(null, { idEntidade: res.insertidEntidade, ...newApostilas });
  });
};

Apostilas.findById = (apostilasidEntidade, result) => {
  sql.query(`SELECT * FROM apostilas WHERE idEntidade = ${apostilasidEntidade}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found apostilas: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Apostilas with the id
    result({ kind: "not_found" }, null);
  });
};

Apostilas.getAll = result => {
  sql.query("SELECT * FROM apostilas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("apostilas: ", res);
    result(null, res);
  });
};

Apostilas.updateById = (idEntidade, apostilas, result) => {
  sql.query(
    "UPDATE apostilas SET idEntidade = ?, anoAtual = ?, idMaterialAnoAnterior = ?, idMaterialAnoAtual = ?, nome = ?, titulo = ?, dataAula = ?, versaoOriginal = ?, anoImagensPorEntidade = ?, versaoOriginal2022 = ?, fk_idEspecialidade = ? WHERE idEntidade = ?",
    [apostilas.idEntidade, apostilas.anoAtual, apostilas.idMaterialAnoAnterior, apostilas.idMaterialAnoAtual, apostilas.nome, apostilas.titulo, apostilas.dataAula, apostilas.versaoOriginal, apostilas.anoImagensPorEntidade, apostilas.versaoOriginal2022, apostilas.fk_idEspecialidade, idEntidade],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Apostilas with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated apostilas: ", { idEntidade: idEntidade, ...apostilas });
      result(null, { idEntidade: idEntidade, ...apostilas });
    }
  );
};

Apostilas.remove = (idEntidade, result) => {
  sql.query("DELETE FROM apostilas WHERE idEntidade = ?", idEntidade, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Apostilas with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted apostilas with idEntidade: ", idEntidade);
    result(null, res);
  });
};

Apostilas.removeAll = result => {
  sql.query("DELETE FROM apostilas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} apostilas`);
    result(null, res);
  });
};

module.exports = Apostilas;