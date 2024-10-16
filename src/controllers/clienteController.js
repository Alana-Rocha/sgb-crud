import { ClienteModel } from "../models/ClienteModel.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

export class ClienteController {
  constructor() {
    this.clienteModel = new ClienteModel();
  }

  async inputDadosCliente() {
    try {
      const cpf = prompt("Digite o CPF: ");  
      const cliente = await this.clienteModel.verificaCpf(cpf);
      
      if (cliente.length > 0) {
        console.log("Cliente já registrado.");
        return;
      }

      const nome_cliente = prompt("Digite o nome do cliente: ");
      const idade = +prompt("Digite a idade: ");

      await this.clienteModel.inserirDadosCliente(cpf, nome_cliente, idade);
      console.log("Cliente inserido com sucesso!");
    } catch (error) {
      console.error("Erro ao inserir o cliente:", error.message);
    }
  }

  async buscarCliente() {
    await this.clienteModel.buscarClientes();
  }

  async removerCliente() {
    try {
      const cpf = prompt("Digite o CPF para remover: ");
      await this.clienteModel.removerCliente(cpf);
      console.log("Cliente removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover o cliente:", error.message);
    }
  }
}
