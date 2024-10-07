import { connection } from "../database/conexion.js";
import dfd from "danfojs-node";

export class Poltrona {
  async buscarPoltronasDB() {
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
    const sql = `UPDATE poltronas
                 SET  status_poltrona = 'OCUPADA'
                 WHERE id = ${poltrona_id}`;

    try {
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) {
            return reject(new Error("Erro ao ocupar Poltronas " + err));
          }
          resolve(result);
        });
      });

      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
