import { FilmeModel } from "../models/FilmeModel";
import { scan } from "../utils/scan";

export class FilmeController {
  async inserir() {
    const titulo = scan("Titulo do filme: ");
    const duracao = +scan("Duração do filme: ");
    const genero = scan("Gênero do filme(Ex: Terror): ");

    const novoFilme = new FilmeModel({ titulo, duracao, genero });

    await FilmeModel.create(novoFilme);
  }

  async listar() {
    await FilmeModel.read();
    scan("Aperte a tecla Enter para continuar >>>");
  }

  async atualizar() {
    const id = +scan("Atualizar pelo Id do filme: ");
    const titulo = scan("Titulo do filme: ");
    const duracao = +scan("Duração do filme: ");
    const genero = scan("Gênero do filme: ");

    const filmeAtualizado = new FilmeModel({ id, titulo, duracao, genero });

    await FilmeModel.update(filmeAtualizado);
  }

  async excluir() {}
}
