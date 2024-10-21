import { read } from "fs";
import { executeQuery } from "../database/connection";

export default class SalaModel {
  static async read() {
    const sql = `SELECT * FROM mydb.salas;`;
    const salas = await executeQuery(sql);
    console.table(salas);
    return;
  }
}
