import { executeQuery } from "../database/connection";
import * as dfd from "danfojs-node";

type FilmeModelProps = {
  id?: number;
  titulo: string;
  duracao: number;
  genero: string;
};

export class FilmeModel implements FilmeModelProps {
  id?: number;
  titulo: string;
  duracao: number;
  genero: string;

  constructor(props: FilmeModelProps) {
    Object.assign(this, props);
  }

  static async create(filme: Omit<FilmeModel, "id">) {
    const sql = `INSERT INTO filmes (titulo, duracao, genero) VALUES ("${filme.titulo}", ${filme.duracao}, "${filme.genero}");`;
    await executeQuery(sql);
    console.log("Filme cadastrado com sucesso!");
  }

  static async read() {
    const sql = "SELECT * FROM filmes;";
    const filmes = await executeQuery<FilmeModel[]>(sql);
    const df = new dfd.DataFrame(filmes);
    df.setIndex({ column: "id", drop: true, inplace: true });
    df.print();
    return df;
  }

  static async count() {
    const sql = "SELECT COUNT(*) AS filmesQtd FROM filmes;";
    const filmesQtd = await executeQuery<{ filmesQtd: number }[]>(sql);
    return filmesQtd[0].filmesQtd;
  }

  static async update(filme: FilmeModel) {
    const sql = `
    UPDATE filmes
    SET titulo = '${filme.titulo}',
        duracao = '${filme.duracao}',
        genero = '${filme.genero}'
    WHERE id = ${filme.id}; 
`;
    await executeQuery(sql);
    console.log("\nFilme atualizado com sucesso!\n");
  }

  static async delete() {
    const sql = `DELETE FROM filmes WHERE id = ?`;
    await executeQuery(sql);
    console.log("Filme removido com sucesso");
  }
}
