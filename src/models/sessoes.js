import dfd from "danfojs-node";
import PromptSync from "prompt-sync";
import { connection } from "../database/conexion.js";
import { to } from "../utils/errorHandler.js";

export class Sessao {
  filme_id;
  sala_id;
  horario_inicio;

  constructor() {
    this.scan = PromptSync();
  }

  inputDadosSessao(filmeId, salaId) {
    this.filme_id = filmeId;
    this.sala_id = salaId;
    this.horario_inicio = this.scan(
      "Digite o Horario de inicio do filme (DD/MM/AAAA HH/MM): "
    );
  }

  async inserirDadosSessao() {
    const sql = `INSERT INTO sessoes (filme_id, sala_id, horario_inicio) VALUES (?, ?, ?);`;

    const [err, result] = await to(
      new Promise((resolve, reject) => {
        connection.query(
          sql,
          [this.filme_id, this.sala_id, this.horario_inicio],
          (err, result) => {
            if (err)
              return reject(
                new Error("Erro ao inserir dados da Sessao: " + err.message)
              );
            resolve(result);
          }
        );
      })
    );

    if (err) {
      console.error(err);
      return;
    }

    return result;
  }

  async buscarSessoes() {
    const sql = ` 
                  SELECT
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

    const [err, result] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err)
            return reject(new Error("Erro ao buscar Sessoes: " + err.message));
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

  async selecionarSessao(id) {
    const sql = `SELECT sala_id FROM sessoes WHERE id = ${id}`;

    const [err, result] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err)
            return reject(
              new Error("Erro ao buscar poltronas: " + err.message)
            );
          resolve(result);
        });
      })
    );

    if (err) {
      console.error(err);
      return null;
    }

    if (result.length > 0) {
      const sala_id = result[0].sala_id;
      console.log("sala_id:", sala_id);

      return sala_id;
    } else {
      console.log("Nenhuma sala encontrada para o id fornecido.");
      return null;
    }
  }

  async removerSessao() {
    await this.buscarSessoes();
    const id = this.scan("Deletar pelo Id da Sessao: ");
    const sql = `DELETE FROM sessoes WHERE id = ?`;

    const [err] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, [id], (err) => {
          if (err)
            return reject(new Error("Erro ao deletar sessão: " + err.message));
          resolve("Sessão Excluída");
        });
      })
    );

    if (err) {
      console.error(err);
      return;
    }

    console.log("Sessão excluída com sucesso!");
  }
}
