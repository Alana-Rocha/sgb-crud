import { SessaoModel } from "../models/SessaoModel";
import { scan } from "../utils/scan";


export class SessaoController {
  async inserir() {
    const filme_id = +scan("Id do filme: ");
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

  async excluir() {}
}
