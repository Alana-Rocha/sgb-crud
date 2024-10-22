import { setTimeout } from "timers/promises";
import { FilmeModel } from "../models/FilmeModel";
import { SessaoModel } from "../models/SessaoModel";
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
    await FilmeModel.read();
    const id = +scan("Atualizar pelo Id do filme: ");
    const titulo = scan("Titulo do novo filme: ");
    const duracao = +scan("Duração do novo filme: ");
    const genero = scan("Gênero do novo filme: ");

    const filmeAtualizado = new FilmeModel({ id, titulo, duracao, genero });

    await FilmeModel.update(filmeAtualizado);
    return;
  }

  async excluir() {
    await FilmeModel.read();

    const filme_id = +scan("Id do filme: ");

    const filmes = await SessaoModel.findByFilme(filme_id);
    const filme = await FilmeModel.find(filme_id);

    if (!filmes || !filme) {
      console.log("Este Filme não existe em nossa base de dados.");
      console.log("Voltando para o menu principal...");
      return;
    }

    let mensagemAviso = "Confirmar ação? (1-Sim | 2-Não): ";

    if (filmes) {
      mensagemAviso = "Existe uma Sessão para esse Filme. " + mensagemAviso;
    }

    const confirmarAcao = scan(mensagemAviso);

    if (confirmarAcao !== "1") {
      console.log("Voltando para o menu principal...");
      return;
    }

    await FilmeModel.delete(filme_id);

    return;
  }
}
