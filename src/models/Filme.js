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
}
