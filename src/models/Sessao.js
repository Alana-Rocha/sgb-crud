import { connection } from "../database/conexion.js";
import PromptSync from "prompt-sync";
import dfd from "danfojs-node";

export class Sessao {
  filme_id;
  sala_id;
  horario_inicio;

  constructor() {
    this.scan = PromptSync();
  }

  inputDados() {
    this.filme_id = +this.scan("Id do filme: ");
    this.sala_id = +this.scan("Id da sala: ");
    this.horario_inicio = this.scan(
      "Digite o Horario de inicio do filme (DD/MM/AAAA HH/MM): "
    );
  }

  async escreverDadosDB() {
    const sql = `INSERT INTO sessoes (filme_id, sala_id, horario_inicio) VALUES (?, ?, ?);`;

    try {
      const result = await new Promise((resolve, reject) => {
        connection.query(
          sql,
          [this.filme_id, this.sala_id, this.horario_inicio],
          (err, result) => {
            if (err)
              return reject(
                new Error("Erro ao inserir dados da Sessao" + err.message)
              );
            return resolve(result);
          }
        );
      });

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async buscarSessoesDB() {
    const sql = ` 
                  SELECT
                    filmes.titulo AS nome_filme,
                    salas.nome AS nome_sala,
                    sessoes.horario_inicio
                  FROM
                    sessoes
                  JOIN
                    filmes ON sessoes.filme_id = filmes.id
                  JOIN
                    salas ON sessoes.sala_id = salas.id;`;

    try {
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) {
            return reject(new Error("Erro ao buscar Sessoes: " + err.message));
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
