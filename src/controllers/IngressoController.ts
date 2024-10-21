import console from "console";
import { IngressoModel } from "../models/IngressoModel";
import { SessaoModel } from "../models/SessaoModel";
import { scan } from "../utils/scan";
import { ClienteModel } from "../models/ClienteModel";
import PoltronaModel from "../models/PoltronaModel";

export class IngressoController {
  async inserir() {
    await SessaoModel.read();
    const sessao_id: number = +scan("Id da Sessão: ");

    const findSessao = await SessaoModel.find(sessao_id);

    const poltronas = await PoltronaModel.read(findSessao[0].sala_id);

    console.table(poltronas);

    const poltrona_id = +scan("Id da Poltrona: ");

    await ClienteModel.read();

    const cpf_cliente = scan("Cpf do Cliente: ");

    const cliente = await ClienteModel.findByCpf(cpf_cliente);

    if (!cliente) {
      console.log("Este CPF não existe em nossa base de dados ");
      console.log("Voltando para o menu principal...");
      return;
    }

    await PoltronaModel.ocupaPoltrona(poltrona_id);

    const ingresso = new IngressoModel({ cpf_cliente, poltrona_id, sessao_id });
    await IngressoModel.create(ingresso);
  }
}
