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

  async atualizar() {
    await SessaoModel.read();

    const sessao_id = +scan("Id da sessão que deseja atualizar: ");

    const sessao = await SessaoModel.find(sessao_id);

    if (!sessao) {
      console.log("Sessão não existe em nossa base de dados.");
      console.log("Voltando ao menu principal...");
      return;
    }

    await FilmeModel.read();
    const novoFilme = +scan("Id do filme: ");

    await SalaModel.read();
    const novaSala = +scan("Id da sala: ");

    const novo_horario_dia = scan("Digite o dia de inicio do filme (DD): ");

    const novo_horario_mes = scan("Digite o mês de inicio do filme (MM): ");

    const novo_horario_ano = scan("Digite o ano de inicio do filme (AAAA): ");

    const novo_horario_hora =
      +scan("Digite a hora de inicio do filme (hh): ") - 3;

    const novo_horario_minuto = scan(
      "Digite os minutos de inicio do filme (mm): "
    );

    const novo_horario_inicio = `${novo_horario_ano}-${novo_horario_mes}-${novo_horario_dia} ${novo_horario_hora.toString()}:${novo_horario_minuto}:00`;

    const nova_sessao = {
      filme_id: novoFilme,
      sala_id: novaSala,
      horario_inicio: novo_horario_inicio,
      id: sessao_id,
    };

    await SessaoModel.update(nova_sessao);
    return;
  }

  async listar() {
    await SessaoModel.read();
    scan("Aperte a tecla Enter para continuar >>>");
  }

  async excluir() {
    await SessaoModel.read();

    const id = +scan("Digite o id da sessão que deseja excluir: ");

    const sessaoFilme = await SessaoModel.find(id);

    if (!sessaoFilme) {
      console.log("Esta sessão não existe em nossa base de dados.");
      console.log("Voltando para o menu principal...");
      return;
    }

    console.log("Existem registros vinculados a essa sessão.");

    let mensagemAviso = "Confirmar ação? (1-Sim | 2-Não): ";

    const confirmarAcao = scan(mensagemAviso);

    if (confirmarAcao !== "1") {
      console.log("Voltando para o menu principal...");
      return;
    }

    await SessaoModel.delete(id);
    console.log("Sessão excluída com sucesso.");
  }
}
