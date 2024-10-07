import { error } from "console";
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

  inputDados(sesao, poltrona, cliente) {
    this.sessao_id = sesao;
    this.poltrona_id = poltrona;
    this.cpf_cliente = cliente;
  }

  async escreverDadosDB() {
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

  async buscarIngressosDB() {
    const sql = `
             SELECT 
                sessoes.file_id,          
                cliente.nome_cliente,         
                poltronas.numero_poltrona     
             FROM ingressos
             JOIN sessoes ON ingressos.sessao_id = sessoes.id          
             JOIN cliente ON ingressos.cpf_cliente = cliente.cpf        
             JOIN poltronas ON ingressos.poltrona_id = poltronas.id    
                         
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
