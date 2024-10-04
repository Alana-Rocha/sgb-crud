import { connection } from "../database/conexion.js";
import dfd from "danfojs-node";

export class Sala {
  async buscarSalasDB() {
    const sql = `SELECT * FROM salas`;

    try {
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) {
            return reject(new Error("Erro ao buscar salas: " + err.message));
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
