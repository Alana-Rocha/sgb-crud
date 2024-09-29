import { conexion } from "./database/conexion.js";
import { Query } from "./queries/query.js";
import PromptSync from "prompt-sync";

const scan = PromptSync();
const query = new Query();
conexion.connect();
query.criarTabelas();

async function main() {
  let opt;
  while (opt !== 5) { 
    console.log(`
      \n SISTEMA DE GERENCIAMENTO DE BILHETERIA \n
      1 - RELATÓRIOS
      2 - INSERIR REGISTROS
      3 - REMOVER REGISTROS
      4 - ATUALIZAR REGISTROS
      5 - SAIR \n
    `);

    opt = +scan("Opção: ");

    switch (opt) {
      case 1:
        await relatorios();
        scan("Enter para continuar...");
        console.clear();
        break;
      case 2:
        await inserirRegistros();
        scan("Enter para continuar...");
        console.clear();
        break;
      case 3:
        await removerRegistros();
        scan("Enter para continuar...");
        console.clear();
        break;
      case 4:
        await atualizarRegistros();
        scan("Enter para continuar...");
        console.clear();
        break;
      case 5:
        console.log("Saindo...");
        conexion.end();
        break;
      default:
        console.log("Opção inválida! Tente novamente.");1
        scan("Enter para continuar...");
        console.clear();
        break;
    }
  }
}

async function relatorios() {
  console.log("Exibindo relatórios...");
}

async function inserirRegistros() {
  console.log("Inserindo novos registros...");
}

async function removerRegistros() {
  console.log("Removendo registros...");
}

async function atualizarRegistros() {
  console.log("Atualizando registros...");
}

main();
