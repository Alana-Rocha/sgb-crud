import { ClienteModel } from "../models/ClienteModel.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

export class ClienteController {
  constructor() {
    this.clienteModel = new ClienteModel();
  }

  async inputDadosCliente() {
    const cpf = prompt("Digite o CPF: ");  // Use 'prompt' diretamente aqui
    const cliente = await this.clienteModel.verificaCpf(cpf);
    if (cliente.length > 0) {
      console.log("Cliente já registrado.");
      return;
    }
    
    const nome_cliente = prompt("Digite o nome do cliente: ");
    const idade = +prompt("Digite a idade: ");

    await this.clienteModel.inserirDadosCliente(cpf, nome_cliente, idade);
    console.log("Cliente inserido com sucesso!");
  }

  async buscarCliente() {
    const clientes = await this.clienteModel.buscarClientes();
    console.log(clientes);
  }

  async removerCliente() {
    const scan = require('prompt-sync')();
    const cpf = scan("Digite o CPF para remover: ");
    await this.clienteModel.removerCliente(cpf);
  }
}
