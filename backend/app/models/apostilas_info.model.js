const sql = require("./db.js");

// constructor
const Apostilas_info = function(apostilas_info) {
  this.info = apostilas_info.info;
};

Apostilas_info.create = (newApostilas_info, result) => {
  sql.query("INSERT INTO apostilas_info SET ?", newApostilas_info, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created apostilas_info: ", { info: res.insertinfo, ...newApostilas_info });
    result(null, { info: res.insertinfo, ...newApostilas_info });
  });
};

Apostilas_info.findById = (apostilas_infoinfo, result) => {
  sql.query(`SELECT * FROM apostilas_info WHERE info = ${apostilas_infoinfo}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found apostilas_info: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Apostilas_info with the id
    result({ kind: "not_found" }, null);
  });
};

Apostilas_info.getAll = result => {
  sql.query("SELECT * FROM apostilas_info", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("apostilas_info: ", res);
    result(null, res);
  });
};

Apostilas_info.updateById = (info, apostilas_info, result) => {
  sql.query(
    "UPDATE apostilas_info SET info = ? WHERE info = ?",
    [apostilas_info.info, info],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Apostilas_info with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated apostilas_info: ", { info: info, ...apostilas_info });
      result(null, { info: info, ...apostilas_info });
    }
  );
};

Apostilas_info.remove = (info, result) => {
  sql.query("DELETE FROM apostilas_info WHERE info = ?", info, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Apostilas_info with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted apostilas_info with info: ", info);
    result(null, res);
  });
};

Apostilas_info.removeAll = result => {
  sql.query("DELETE FROM apostilas_info", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} apostilas_info`);
    result(null, res);
  });
};

module.exports = Apostilas_info;