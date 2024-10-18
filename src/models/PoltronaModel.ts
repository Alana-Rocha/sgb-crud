import { executeQuery } from "../database/connection";

export default class PoltronaModel {
  static async read(sala_id: number): Promise<PoltronaModel> {
    const sql = `SELECT id, numero_poltrona, status_poltrona FROM mydb.poltronas WHERE sala_id = ${sala_id};`;
    const poltronas = await executeQuery(sql);
    return poltronas;
  }

  static async verificaPoltrona(poltrona_id: number) {
    const sql = `SELECT numero_poltrona, status_poltrona FROM mydb.poltronas WHERE id = ${poltrona_id} AND status_poltrona = 'OCUPADA'`;
    const result = await executeQuery(sql);
    if (result.length > 0) {
      const status = result[0].status_poltrona;
      if (status === "OCUPADA") {
        return false;
      }
    }
    return true;
  }

  static async ocupaPoltrona(poltrona_id: number) {
    const sql = `UPDATE mydb.poltronas SET status_poltrona = 'OCUPADA' WHERE id = ${poltrona_id}`;
    const verificado = await this.verificaPoltrona(poltrona_id);
    if (!verificado) {
      console.log("Erro ao ocupar poltrona.");
      return;
    }
    await executeQuery(sql);

    console.log("Poltrona Ocupada.");
    return;
  }
}
