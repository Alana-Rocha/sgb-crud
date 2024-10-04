import { menuInicial, menuTabelas, menuTabelasAtt } from "./config/menus.js";
import { connectDB, connection } from "./database/conexion.js";
import { Cliente } from "./models/Cliente.js";
import { Filme } from "./models/Filme.js";
import { executeSqlFile } from "./queries/query.js";
import PromptSync from "prompt-sync";

const scan = PromptSync();

async function main() {
  try {
    await connectDB();
    await executeSqlFile();

    let opt;
    let opt2;
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
          opt2 = +scan("Deseja inserir novamente? (1 - Sim | 2 - Não): ");

          //Se quiser continuar inseriondo cai no while até ele digitar 2
          while (opt2 === 1) {
            await inserirRegistros();
            opt2 = +scan("Deseja inserir novamente? (1 - Sim | 2 - Não): ");
          }
          scan("Enter para continuar...");
          console.clear();
          break;
        case 3:
          await removerRegistros();
          opt2 = +scan("Deseja remover novamente? (1 - Sim | 2 - Não): ");

          //Se quiser continuar removendo cai no while até ele digitar 2
          while (opt2 === 1) {
            await removerRegistros();
            opt2 = +scan("Deseja remover novamente? (1 - Sim | 2 - Não): ");
          }
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
      const filme = new Filme();
      await filme.buscarFilmesDB();
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
      await cliente.escreverDadosDB();
      break;
    case 2:
      const filme = new Filme();
      filme.inputDados();
      await filme.escreverDadosDB();
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
  menuTabelas();
  let opt = +scan("Opção: ");

  switch (opt) {
    case 1:
      const cliente = new Cliente();
      await cliente.removerClientesDB();
      break;
    case 2:
      const filme = new Filme();
      await filme.removerFilmesDB();
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

async function atualizarRegistros() {
  menuTabelasAtt();
  let opt = +scan("Opção: ");

  switch (opt) {
    case 1:
      const filme = new Filme();
      await filme.atualizarFilmeDB();
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    default:
      break;
  }
}

main();
