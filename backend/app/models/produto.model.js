const sql = require(".//db.js");

// constructor
const Produto = function (produto) {
  this.nome = produto.nome;
  this.corHomeMeditango = produto.corHomeMeditango;
  this.idProduto = produto.idProduto;
  this.coresTexto = produto.coresTexto;
  this.banners = produto.banners;
};

Produto.create = (newProduto, result) => {
  sql.query("INSERT INTO produto SET ?", newProduto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created produto: ", {
      idProduto: res.insertidProduto,
      ...newProduto,
    });
    result(null, { idProduto: res.insertidProduto, ...newProduto });
  });
};

Produto.findById = (produtoidProduto, result) => {
  sql.query(
    `SELECT * FROM produto WHERE idProduto = ${produtoidProduto}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found produto: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Produto with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Produto.getAll = (result) => {
  sql.query("SELECT * FROM produto", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("produto: ", res);
    result(null, res);
  });
};

Produto.updateById = (idProduto, produto, result) => {
  sql.query(
    "UPDATE produto SET  nome = ?, corHomeMeditango = ? idProduto = ?, coresTexto = ?, banners = ? WHERE idProduto = ?",
    [
      produto.nome,
      produto.corHomeMeditango,
      produto.idProduto,
      produto.coresTexto,
      produto.banners,
      idProduto,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Produto with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated produto: ", { idProduto: idProduto, ...produto });
      result(null, { idProduto: idProduto, ...produto });
    }
  );
};

Produto.remove = (idProduto, result) => {
  sql.query(
    "DELETE FROM produto WHERE idProduto = ?",
    idProduto,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Produto with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted produto with idProduto: ", idProduto);
      result(null, res);
    }
  );
};

Produto.removeAll = (result) => {
  sql.query("DELETE FROM produto", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} produto`);
    result(null, res);
  });
};

module.exports = Produto;
