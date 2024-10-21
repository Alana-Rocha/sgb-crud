import { FilmeModel } from "../models/FilmeModel";
import { SessaoModel } from "../models/SessaoModel";
import { scan } from "../utils/scan";

export class SessaoController {
  async inserir() {
    await FilmeModel.read();

    const filme_id = +scan("Id do filme: ");

    //TODO mostrar tabela da sala

    const sala_id = +scan("Id da sala: ");

    const horario_inicio = scan(
      "Digite o Horario de inicio do filme (DD/MM/AAAA HH/MM): "
    );

    const sessao = new SessaoModel({ filme_id, sala_id, horario_inicio });

    await SessaoModel.create(sessao);
  }

  async listar() {
    await SessaoModel.read();
    scan("Aperte a tecla Enter para continuar >>>");
  }

  async excluir() {
    this.listar();
    await setTimeout(() => {}, 200);
    const id = scan("Digite o id da sessão que deseja excluir: ");

    const sessaoFilme = await SessaoModel.find(+id);

    console.log(sessaoFilme);

    if (!sessaoFilme) {
      console.log("Esta sessão não existe em nossa base de dados.");
      console.log("Voltando para o menu principal...");
      return;
    }

    let mensagemAviso = "Confirmar ação? (1-Sim | 2-Não): ";

    const confirmarAcao = scan(mensagemAviso);

    if (confirmarAcao !== "1") {
      console.log("Voltando para o menu principal...");
      return;
    }

    await SessaoModel.delete(+id);
    console.log("Sessão excluída com sucesso.");
  }
}
