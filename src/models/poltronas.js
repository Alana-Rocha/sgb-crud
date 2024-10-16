import dfd from "danfojs-node";
import { connection } from "../database/conexion.js";
import { to } from "../utils/errorHandler.js";

export class Poltrona {
  async buscarPoltronas() {
    const sql = `SELECT * FROM poltronas`;

    const [err, result] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err)
            return reject(
              new Error("Erro ao buscar Poltronas: " + err.message)
            );
          resolve(result);
        });
      })
    );

    if (err) {
      console.error(err);
      return;
    }

    const df = new dfd.DataFrame(result);
    df.print();

    return df;
  }

  async selecionarPoltronas(sala_id) {
    const sql = `SELECT id, numero_poltrona, status_poltrona FROM poltronas WHERE sala_id = ${sala_id}`;

    const [err, result] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err)
            return reject(
              new Error("Erro ao buscar poltronas: " + err.message)
            );
          resolve(result);
        });
      })
    );

    if (err) {
      console.error(err);
      return;
    }

    const df = new dfd.DataFrame(result);
    df.setIndex({ column: "id", drop: true, inplace: true });
    df.print();

    return df;
  }

  async ocuparPoltrona(poltrona_id) {
    const [err, isOcupada] = await to(
      this.verificarPoltronaOcupada(poltrona_id)
    );

    if (err || !isOcupada) {
      console.error(
        "Erro ao verificar a poltrona ou a poltrona já está ocupada."
      );
      return false;
    }

    const sql = `UPDATE poltronas SET status_poltrona = 'OCUPADA' WHERE id = ${poltrona_id}`;

    const [errUpdate] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err)
            return reject(
              new Error("Erro ao ocupar Poltronas: " + err.message)
            );
          resolve(result);
        });
      })
    );

    if (errUpdate) {
      console.error(errUpdate);
      return false;
    }

    console.log("Poltrona ocupada com sucesso!");
    return true;
  }

  async verificarPoltronaOcupada(poltrona_id) {
    const sql = `SELECT numero_poltrona, status_poltrona FROM poltronas WHERE id = ${poltrona_id} AND status_poltrona = 'OCUPADA'`;

    const [err, result] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, (err, rows) => {
          if (err)
            return reject(
              new Error("Erro ao verificar status da poltrona: " + err.message)
            );
          resolve(rows);
        });
      })
    );

    if (err) {
      console.error(err);
      return false;
    }

    if (result.length > 0 && result[0].status_poltrona === "OCUPADA") {
      return false;
    }

    return true;
  }
}
