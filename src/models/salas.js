import dfd from "danfojs-node";
import { connection } from "../database/conexion.js";
import { to } from "../utils/errorHandler.js";

export class Sala {
  async buscarSalas() {
    const sql = `SELECT * FROM salas`;

    const [err, result] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err)
            return reject(new Error("Erro ao buscar salas: " + err.message));
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
}
