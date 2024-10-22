import { executeQuery } from "../database/connection";

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
    return;
  }

  static async read() {
    const sql = "SELECT * FROM filmes WHERE updatedAt IS NULL;";
    const filmes = await executeQuery<FilmeModel[]>(sql);
    console.table(filmes);
    return;
  }

  static async count() {
    const sql =
      "SELECT COUNT(*) AS filmesQtd FROM filmes WHERE updatedAt IS NULL;";
    const filmesQtd = await executeQuery<{ filmesQtd: number }[]>(sql);
    return filmesQtd[0].filmesQtd;
  }

  static async update(filme: FilmeModel) {
    const sql = `
    UPDATE mydb.filmes
    SET titulo = '${filme.titulo}',
        duracao = '${filme.duracao}',
        genero = '${filme.genero}'
    WHERE id = ${filme.id}; 
`;
    await executeQuery(sql);
    console.log("\nFilme atualizado com sucesso!\n");
    return;
  }

  static async delete(filme_id: number) {
    const sql = ` UPDATE mydb.filmes 
                  SET updatedAt = current_timestamp()
                  WHERE id = ${filme_id};`;
    await executeQuery(sql);
    console.log("Filme removido com sucesso");
    return;
  }

  static async find(filme_id: number): Promise<FilmeModel> {
    const sql = `SELECT * FROM mydb.filmes WHERE id = ${filme_id};`;
    const filmes = await executeQuery(sql);
    return filmes;
  }
}
