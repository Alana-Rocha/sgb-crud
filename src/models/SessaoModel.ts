import { executeQuery } from "../database/connection";
import { FilmeModel } from "./FilmeModel";

type SessaoModelProps = {
  id?: number;
  filme_id: number;
  sala_id: number;
  horario_inicio: string;
};

export class SessaoModel implements SessaoModelProps {
  id?: number;
  filme_id: number;
  sala_id: number;
  horario_inicio: string;

  constructor(props: SessaoModelProps) {
    Object.assign(this, props);
  }
  static async create(sessao: Omit<SessaoModel, "id">) {
    const sql = `INSERT INTO mydb.sessoes (filme_id, sala_id, horario_inicio) VALUES (${sessao.filme_id}, ${sessao.sala_id}, '${sessao.horario_inicio}');`;
    await executeQuery(sql);
    console.log("Sessão criada com sucesso!");
  }

  static async read() {
    const sql = `SELECT
                    sessoes.id,
                    filmes.titulo AS nome_filme,
                    salas.nome AS nome_sala,
                    sessoes.horario_inicio
                  FROM
                    mydb.sessoes
                  JOIN
                    filmes ON sessoes.filme_id = filmes.id
                  JOIN
                    salas ON sessoes.sala_id = salas.id
                  WHERE sessoes.updatedAt IS NULL;`;
    const sessoes = await executeQuery(sql);
    return console.table(sessoes);
  }

  static async update(sessao: SessaoModel) {
    const sql = `
    UPDATE mydb.sessoes
    SET filme_id = '${sessao.filme_id}',
        sala_id = '${sessao.sala_id}',
        horario_inicio = '${sessao.horario_inicio}'
    WHERE id = ${sessao.id}; 
`;
    await executeQuery(sql);
    console.log("\nSessão atualizada com sucesso!\n");
    return;
  }

  static async find(sessao_id: number): Promise<SessaoModel> {
    const sql = `SELECT * FROM mydb.sessoes WHERE id = ${sessao_id}`;
    const sessao = await executeQuery(sql);
    return sessao;
  }

  static async findByFilme(filme_id: number): Promise<FilmeModel> {
    const sql = `SELECT * FROM mydb.sessoes WHERE filme_id = ${filme_id};`;
    const filmes = await executeQuery(sql);
    return filmes;
  }

  static async count() {
    const sql =
      "SELECT COUNT(*) AS sessaoQtd FROM mydb.sessoes WHERE updatedAt IS NULL;";
    const sessaoQtd = await executeQuery<{ sessaoQtd: number }[]>(sql);
    return sessaoQtd[0].sessaoQtd;
  }

  static async delete(id: number) {
    const sql = ` UPDATE mydb.sessoes
                  SET updatedAt = current_timestamp()
                  WHERE id = ${id};
    `;
    await executeQuery(sql);
    console.log("Sessão removida com sucesso");
  }
}
