import PromptSync from "prompt-sync";
import { connection } from "../database/conexion.js";

export class Filme {
  titulo;
  duracao;
  genero;

  constructor() {
    this.scan = PromptSync();
  }

  inputDados() {
    this.titulo = this.scan("Titulo do filme: ");
    this.duracao = +this.scan("Duração do filme: ");
    this.genero = this.scan("Gênero do filme: ");
  }

  async escreverDadosDB() {
    const sql = `INSERT INTO filmes (titulo, duracao, genero) VALUES (?, ?, ?)`;
    await new Promise((resolve, reject) => {
      connection.query(sql, [this.titulo, this.duracao, this.genero], (err) => {
        if (err) return reject("Erro ao inserir dados do filme", err);
        return resolve("Cliente inserido");
      });
    });
  }

  async buscarFilmesDB() {
    const sql = `SELECT * FROM filmes`;
    await new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if (err) return reject(console.log("Erro ao buscar", err));
        return resolve(console.table(result));
      });
    });
  }

  async removerFilmesDB() {
    await this.buscarFilmesDB();
    const id = this.scan("Deleter pelo Id do filme: ");
    const sql = `DELETE FROM filmes WHERE id = ?`;
    await new Promise((resolve, reject) => {
      connection.query(sql, [id], (err, result) => {
        if (err) return reject(console.log("Erro ao deletar", err));

        return resolve("filme excluido");
      });
    });
  }

  async atualizarFilmeDB() {
    await this.buscarFilmesDB();
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

    await new Promise((resolve, reject) => {
      connection.query(sql, [attTitulo, attDuracao, attGenero, id], (err) => {
        if (err) return reject(console.log("Erro ao atualizar filme" + err));
        return resolve(console.log("Filme atualizado"));
      });
    });
  }
}
