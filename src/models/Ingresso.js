import { connection } from "../database/conexion.js";
import dfd from "danfojs-node";
import PromptSync from "prompt-sync";

export class Ingresso {
  sessao_id;
  poltrona_id;
  cpf_cliente;

  constructor() {
    this.scan = PromptSync();
  }

  inputDados() {
    this.sessao_id = +this.scan("Digite o Id da Sessão: ");
    this.poltrona_id = +this.scan("Digite o Id da Poltrona: ");
    this.cpf_cliente = this.scan("Digite o CPF do Cliente: ");
  }

  async escreverDadosDB() {
    const sql = `INSERT INTO cliente (sessao_id, poltrona_id, cpf_cliente) VALUES (?, ?, ?)`;
    await new Promise((resolve, reject) => {
      connection.query(
        sql,
        [this.sessao_id, this.poltrona_id, this.cpf_cliente],
        (err) => {
          if (err) return reject("Erro ao inserir dados do ingresso", err);
          return resolve("Ingresso inserido");
        }
      );
    });
  }

  async buscarIngressosDB() {
    const sql = `
              SELECT
                  ingressos.id AS ingresso_id,
                  sessoes.id AS sessao_id,    -- Aqui está o ID da sessão
                  sessoes.filme_id,
                  sessoes.sala_id,
                  sessoes.horario_inicio,     -- Horário de início da sessão
                  filmes.titulo AS nome_filme,
                  salas.nome AS nome_sala,
                  cliente.nome_cliente,
                  ingressos.poltrona_id
              FROM
                  ingressos
              JOIN
                  sessoes ON ingressos.sessao_id = sessoes.id
              JOIN
                  filmes ON sessoes.filme_id = filmes.id
              JOIN
                  salas ON sessoes.sala_id = salas.id
              JOIN
                  cliente ON ingressos.cpf_cliente = cliente.cpf
              WHERE
                  cliente.cpf = '000.000.000-00';  -- Substitua pelo CPF que você deseja buscar

`;

    try {
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) {
            return reject(
              new Error("Erro ao buscar Ingressos: " + err.message)
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
