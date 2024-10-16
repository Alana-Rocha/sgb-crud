import dfd from "danfojs-node";
import PromptSync from "prompt-sync";
import { connection } from "../database/conexion.js";
import { to } from "../utils/errorHandler.js";

export class Filme {
  titulo;
  duracao;
  genero;

  constructor() {
    this.scan = PromptSync();
  }

  inputDadosFilme() {
    this.titulo = this.scan("Titulo do filme: ");
    this.duracao = +this.scan("Duração do filme: ");
    this.genero = this.scan("Gênero do filme(Ex: Terror): ");
  }
  async inserirDadosFilme() {
    const sql = `INSERT INTO filmes (titulo, duracao, genero) VALUES (?, ?, ?)`;

    const [err] = await to(
      new Promise((resolve, reject) => {
        connection.query(
          sql,
          [this.titulo, this.duracao, this.genero],
          (err) => {
            if (err) return reject("Erro ao inserir dados do filme");
            return resolve("Filme inserido com sucesso!");
          }
        );
      })
    );

    if (err) {
      console.error(err);
      return;
    }

    console.log("Filme inserido com sucesso!");
  }

  async buscarFilme() {
    const sql = `SELECT * FROM filmes`;

    const [err, result] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) {
            return reject(new Error("Erro ao buscar filmes: " + err.message));
          }
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

  async removerFilme() {
    await this.buscarFilme();
    const id = this.scan("Insira o ID do filme que deseja remover: ");
    const sql = `DELETE FROM filmes WHERE id = ?`;

    const [err] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, [id], (err) => {
          if (err) return reject("Erro ao deletar filme");
          return resolve("Filme excluído com sucesso!");
        });
      })
    );

    if (err) {
      console.error(err);
      return;
    }

    console.log("Filme excluído com sucesso!");
  }

  async atualizarDadosFilme() {
    await this.buscarFilme();
    const id = this.scan("Atualizar pelo Id do filme: ");

    const attTitulo = this.scan("Titulo do filme: ");
    const attDuracao = +this.scan("Duração do filme: ");
    const attGenero = this.scan("Gênero do filme: ");

    const sql = `
                UPDATE filmes
                SET titulo = ?,
	                  duracao = ?,
                    genero = ?
                WHERE id = ?; 
                     `;

    const [err] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, [attTitulo, attDuracao, attGenero, id], (err) => {
          if (err) return reject("Erro ao atualizar filme");
          return resolve("Filme atualizado com sucesso!");
        });
      })
    );

    if (err) {
      console.error(err);
      return;
    }

    console.log("Filme atualizado com sucesso!");
  }
}
