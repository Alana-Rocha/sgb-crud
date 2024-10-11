import { connection } from "../database/conexion.js";
import dfd from "danfojs-node";

export class Poltrona {
  async buscarPoltronas() {
    const sql = `SELECT * FROM poltronas`;

    try {
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) {
            return reject(
              new Error("Erro ao buscar Poltronas: " + err.message)
            );
          }
          resolve(result);
        });
      });

      const df = new dfd.DataFrame(result);

      df.print();

      return df;
    } catch (error) {
      console.error(error);
    }
  }

  async selecionarPoltronas(sala_id) {
    const sql = `SELECT id, numero_poltrona, status_poltrona FROM poltronas WHERE sala_id = ${sala_id}`;

    try {
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) {
            return reject(new Error("Erro ao buscar poltronas " + err));
          }
          resolve(result);
        });
      });

      const df = new dfd.DataFrame(result);

      df.print();

      return df;
    } catch (error) {
      console.error(error);
    }
  }

  async ocuparPoltrona(poltrona_id) {
    try {
      if ((await this.verificarPoltronaOcupada(poltrona_id)) === true) {
        const sql = `UPDATE poltronas
                 SET  status_poltrona = 'OCUPADA'
                 WHERE id = ${poltrona_id}`;
        const result = await new Promise((resolve, reject) => {
          connection.query(sql, (err, result) => {
            if (err) {
              return reject(new Error("Erro ao ocupar Poltronas " + err));
            }
            resolve(result);
          });
        });
        return true;
      }
      return false;
    } catch (error) {
      console.log(error.message);
    }
  }

  async verificarPoltronaOcupada(poltrona_id) {
    const sql = `SELECT numero_poltrona, status_poltrona FROM poltronas WHERE id = ${poltrona_id} AND status_poltrona = 'OCUPADA'`;

    try {
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, (err, rows) => {
          if (err) {
            return reject(
              new Error("Erro ao verificar status poltrona " + err)
            );
          }
          resolve(rows);
        });
      });

      if (result.length > 0) {
        const status = result[0].status_poltrona;
        if (status === "OCUPADA") {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Erro ao verificar o status da poltrona:", error);
    }
  }
}
