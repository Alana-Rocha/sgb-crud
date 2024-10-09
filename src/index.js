import {
  menuInicial,
  menuInserirEremover,
  menuTabelas,
  menuTabelasAtt,
} from "./config/menus.js";
import { connectDB, connection } from "./database/conexion.js";
import { Cliente } from "./models/Cliente.js";
import { Filme } from "./models/Filme.js";
import { Ingresso } from "./models/Ingresso.js";
import { Poltrona } from "./models/Poltrona.js";
import { Sala } from "./models/Sala.js";
import { Sessao } from "./models/Sessao.js";
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

          opt2 = +scan(
            "Deseja ver relatórios novamente? (1 - Sim | 2 - Não): "
          );

          while (opt2 === 1) {
            await relatorios();
            opt2 = +scan(
              "Deseja ver relatórios novamente? (1 - Sim | 2 - Não): "
            );
          }

          scan("Enter para continuar...");
          console.clear();
          break;

        case 2:
          await inserirRegistros();
          opt2 = +scan("Deseja inserir novamente? (1 - Sim | 2 - Não): ");

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
  const cliente = new Cliente();
  const filme = new Filme();
  const sessao = new Sessao();
  const sala = new Sala();
  const poltrona = new Poltrona();
  const ingresso = new Ingresso();

  menuTabelas();

  let opt = +scan("Opção: ");

  switch (opt) {
    case 1:
      await cliente.buscarClientesDB();
      break;

    case 2:
      await filme.buscarFilmesDB();
      break;

    case 3:
      await ingresso.buscarIngressosDB();
      break;

    case 4:
      await sala.buscarSalasDB();
      break;

    case 5:
      await sessao.buscarSessoesDB();
      break;

    case 6:
      break;

    default:
      break;
  }
}

async function inserirRegistros() {
  const cliente = new Cliente();
  const sessao = new Sessao();
  const sala = new Sala();
  const filme = new Filme();
  const ingresso = new Ingresso();
  const poltrona = new Poltrona();

  menuInserirEremover();

  let opt = +scan("Opção: ");

  switch (opt) {
    case 1:
      cliente.inputDados();
      await cliente.escreverDadosDB();
      break;

    case 2:
      filme.inputDados();
      await filme.escreverDadosDB();
      break;

    case 3:
      console.log("\nSESSÕES");
      await sessao.buscarSessoesDB();

      let sessaoId = +scan("Escolha o Id da Sessão: ");
      const sala_id = await sessao.selecioanrSessao(sessaoId);

      console.log("\nPOLTRONAS");
      await poltrona.selecionarPoltronas(sala_id);

      let poltronaId = +scan("Escolha o Id da Poltrona: ");

      console.log("\nCLIENTE");
      await cliente.buscarClientesDB();

      let clienteCpf = scan("Escolha o CPF do Cliente: ");

      ingresso.inputDados(sessaoId, poltronaId, clienteCpf);

      if ((await poltrona.ocuparPoltrona(poltronaId)) === false) {
        console.log("\nCadeira já está ocupada...\n");
        break;
      }

      await ingresso.escreverDadosDB();

      break;

    case 4:
      console.log("\nFILMES");

      await filme.buscarFilmesDB();

      console.log("\nSALAS");

      await sala.buscarSalasDB();

      sessao.inputDados();

      await sessao.escreverDadosDB();

      break;

    case 5:
      break;

    default:
      break;
  }
}

async function removerRegistros() {
  const cliente = new Cliente();
  const filme = new Filme();
  const ingresso = new Ingresso();
  const sessao = new Sessao();

  menuInserirEremover();

  let opt = +scan("Opção: ");

  switch (opt) {
    case 1:
      await cliente.removerClientesDB();
      break;

    case 2:
      await filme.removerFilmesDB();
      break;

    case 3:
      await ingresso.removerIngresso();
      break;

    case 4:
      await sessao.removerSessao();
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
  const filme = new Filme();

  menuTabelasAtt();

  let opt = +scan("Opção: ");

  switch (opt) {
    case 1:
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
