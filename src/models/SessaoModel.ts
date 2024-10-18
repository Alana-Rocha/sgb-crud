import { executeQuery } from "../database/connection";

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
    const sql = `INSERT INTO sessoes (filme_id, sala_id, horario_inicio) VALUES (${sessao.filme_id}, ${sessao.sala_id}, ${sessao.horario_inicio});`;
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
                    sessoes
                  JOIN
                    filmes ON sessoes.filme_id = filmes.id
                  JOIN
                    salas ON sessoes.sala_id = salas.id;`;
    const sessoes = await executeQuery(sql);
    console.table(sessoes);
  }

  static async count() {
    const sql = "SELECT COUNT(*) AS sessaoQtd FROM sessoes;";
    const sessaoQtd = await executeQuery<{ sessaoQtd: number }[]>(sql);
    return sessaoQtd[0].sessaoQtd;
  }
}
