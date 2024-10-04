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
}
