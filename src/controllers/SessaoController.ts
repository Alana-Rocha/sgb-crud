import { FilmeModel } from "../models/FilmeModel";
import SalaModel from "../models/SalaModel";
import { SessaoModel } from "../models/SessaoModel";
import { scan } from "../utils/scan";

export class SessaoController {
  async inserir() {
    await FilmeModel.read();

    const filme_id = +scan("Id do filme: ");

    await SalaModel.read();

    const sala_id = +scan("Id da sala: ");

    const horario_dia = scan("Digite o dia de inicio do filme (DD): ");

    const horario_mes = scan("Digite o mês de inicio do filme (MM): ");

    const horario_ano = scan("Digite o ano de inicio do filme (AAAA): ");

    const horario_hora = +scan("Digite a hora de inicio do filme (hh): ") - 3;

    const horario_minuto = scan("Digite os minutos de inicio do filme (mm): ");

    const horario_inicio = `${horario_ano}-${horario_mes}-${horario_dia} ${horario_hora.toString()}:${horario_minuto}:00`;

    const sessao = new SessaoModel({ filme_id, sala_id, horario_inicio });

    await SessaoModel.create(sessao);
  }

  async listar() {
    await SessaoModel.read();
    scan("Aperte a tecla Enter para continuar >>>");
  }

  async excluir() {}
}
