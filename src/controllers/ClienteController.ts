import { setTimeout } from "timers/promises";
import { ClienteModel } from "../models/ClienteModel";
import { IngressoModel } from "../models/IngressoModel";
import { scan } from "../utils/scan";

export class ClienteController {
  async inserir() {
    const cpf = scan("Digite o CPF: ");
    const clienteExistente = await ClienteModel.findByCpf(cpf);

    if (clienteExistente) {
      console.log("\nCliente já registrado!!!\n");
      return;
    }

    const nome = scan("Digite o nome do cliente: ");
    const idade = +scan("Digite a idade: ");

    const novoCliente = new ClienteModel({ cpf, idade, nome });

    await ClienteModel.create(novoCliente);
  }

  async listar() {
    await ClienteModel.read();
    scan("Aperte a tecla Enter para continuar >>>");
  }

  async excluir() {
    this.listar();
    await setTimeout(200);
    const cpf = scan("Digite o CPF que deseja excluir: ");
    const ingressoCliente = await IngressoModel.findByCpf(cpf);

    let mensagemAviso = "Confirmar ação? (1-Sim | 2-Não): ";

    if (ingressoCliente) {
      mensagemAviso = "Existe um ingresso para esse cliente. " + mensagemAviso;
    }

    const confirmarAcao = scan(mensagemAviso);

    if (confirmarAcao !== "1") {
      console.log("Voltando para o menu principal...");
      return;
    }

    await ClienteModel.delete(cpf);
  }
}
