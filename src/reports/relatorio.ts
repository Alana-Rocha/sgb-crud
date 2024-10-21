import { executeQuery } from "../database/connection";
import { SessaoController } from "../controllers/SessaoController";

export default class Relatorio {
  static async ingVendidos() {
    const sql = ` SELECT filmes.titulo AS nome_filme, COUNT(ingressos.id) AS total_ingressos FROM mydb.ingressos
                  JOIN mydb.sessoes ON ingressos.sessao_id = sessoes.id
                  JOIN mydb.filmes ON sessoes.filme_id = filmes.id
                  GROUP BY filmes.titulo;`;

    const vendas = await executeQuery(sql);
    return console.table(vendas);
  }

  static async sessoesAbertas() {
    const sessaoController = new SessaoController();
    await sessaoController.listar();
    return;
  }
}
