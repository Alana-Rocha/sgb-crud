import { menuInicial, menuTabelas } from "./config/menus.js";
import { connectDB, connection } from "./database/conexion.js";
import { Cliente } from "./models/Cliente.js";
import { executeSqlFile } from "./queries/query.js";
import PromptSync from "prompt-sync";

const scan = PromptSync();

async function main() {
  try {
    await connectDB();
    await executeSqlFile();

    let opt;
    while (opt !== 5) {
      menuInicial();

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
          connection.end();
          break;
        default:
          console.log("Opção inválida! Tente novamente.");
          1;
          scan("Enter para continuar...");
          console.clear();
          break;
      }
    }
  } catch (err) {
    return console.log(err);
  }
}

async function relatorios() {
  menuTabelas();
  let opt = +scan("Opção: ");
  switch (opt) {
    case 1:
      const cliente = new Cliente();
      await cliente.buscarClientesDB();
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;
    default:
      break;
  }
}

async function inserirRegistros() {
  menuTabelas();
  let opt = +scan("Opção: ");

  switch (opt) {
    case 1:
      const cliente = new Cliente();
      cliente.inputDados();
      cliente.escreverDadosDB();
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;
    default:
      break;
  }
}

async function removerRegistros() {
  console.log("Removendo registros...");
}

async function atualizarRegistros() {
  console.log("Atualizando registros...");
}

main();
