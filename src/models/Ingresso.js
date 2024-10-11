import dfd from "danfojs-node";
import PromptSync from "prompt-sync";
import { connection } from "../database/conexion.js";

export class Ingresso {
  sessao_id;
  poltrona_id;
  cpf_cliente;

  constructor() {
    this.scan = PromptSync();
  }

  inputDados(sesao, poltrona, cliente) {
    this.sessao_id = sesao;
    this.poltrona_id = poltrona;
    this.cpf_cliente = cliente;
  }

  async inserirDadosIngresso() {
    const sql = `INSERT INTO ingressos (sessao_id, poltrona_id, cpf_cliente) VALUES (?, ?, ?)`;

    await new Promise((resolve, reject) => {
      connection.query(
        sql,
        [this.sessao_id, this.poltrona_id, this.cpf_cliente],
        (err) => {
          if (err) return reject("Erro ao inserir dados do ingresso" + err);
          return resolve("Ingresso inserido");
        }
      );
    });
  }

  async buscarIngressos() {
    const sql = `
            SELECT 
              ingressos.id AS id_ingresso,             
              cliente.nome_cliente,                      
              poltronas.numero_poltrona,                 
              filmes.titulo AS nome_filme,               
              sessoes.horario_inicio                     
            FROM ingressos
            JOIN cliente ON ingressos.cpf_cliente = cliente.cpf         
            JOIN poltronas ON ingressos.poltrona_id = poltronas.id       
            JOIN sessoes ON ingressos.sessao_id = sessoes.id            
            JOIN filmes ON sessoes.filme_id = filmes.id;                 
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

  async removerIngresso() {
    await this.buscarIngressos();
    const id = this.scan("Deleter pelo Id do Ingresso: ");
    const sql = `DELETE FROM ingressos WHERE id = ?`;

    try {
      await new Promise((resolve, reject) => {
        connection.query(sql, [id], (err, result) => {
          if (err) return reject(console.log("Erro ao deletar", err));

          resolve("Ingresso Excluido");
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
}
