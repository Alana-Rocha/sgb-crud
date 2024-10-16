import PromptSync from "prompt-sync";
import { ClienteController } from "./controllers/clienteController.js";
import { connectDB, connection } from "./database/conexion.js";
import { Filme } from "./models/filmes.js";
import { Ingresso } from "./models/Ingressos.js";
import { Poltrona } from "./models/Poltronas.js";
import { Sala } from "./models/Salas.js";
import { Sessao } from "./models/sessoes.js";
import { executeSqlFile } from "./queries/query.js";
import {
  menuInicial,
  menuInserirRegistro,
  menuRemoverRegistro,
  menuTabelas,
  menuTabelasAtt,
} from "./utils/menus.js";

const scan = PromptSync();

const cliente = new ClienteController();

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
  const filme = new Filme();
  const sessao = new Sessao();
  const sala = new Sala();
  const ingresso = new Ingresso();

  menuTabelas();

  let opt = +scan("Opção: ");

  switch (opt) {
    case 1:
      await cliente.buscarCliente();
      break;

    case 2:
      await filme.buscarFilme();
      break;

    case 3:
      await ingresso.buscarIngressos();
      break;

    case 4:
      await sala.buscarSalas();
      break;

    case 5:
      await sessao.buscarSessoes();
      break;

    case 6:
      break;

    default:
      break;
  }
}

async function inserirRegistros() {
  const sessao = new Sessao();
  const sala = new Sala();
  const filme = new Filme();
  const ingresso = new Ingresso();
  const poltrona = new Poltrona();

  menuInserirRegistro();

  let opt = +scan("Opção: ");

  switch (opt) {
    case 1:
      await cliente.inputDadosCliente();
      break;

    case 2:
      filme.inputDadosFilme();
      await filme.inserirDadosFilme();
      break;

    case 3:
      console.log("\nSESSÕES");
      await sessao.buscarSessoes();

      let sessaoId = +scan("Escolha o Id da Sessão: ");
      const sala_id = await sessao.selecionarSessao(sessaoId);

      console.log("\nPOLTRONAS");
      await poltrona.selecionarPoltronas(sala_id);

      let poltronaId = +scan("Escolha o Id da Poltrona: ");

      console.log("\nCLIENTE");
      await cliente.buscarCliente();

      let clienteCpf = scan("Escolha o CPF do Cliente: ");

      ingresso.inputDados(sessaoId, poltronaId, clienteCpf);

      if ((await poltrona.ocuparPoltrona(poltronaId)) === false) {
        console.log("\nCadeira já está ocupada...\n");
        break;
      }

      await ingresso.inserirDadosIngresso();

      break;

    case 4:
      console.log("\nFILMES");

      await filme.buscarFilme();

      console.log("\nSALAS");

      await sala.buscarSalas();

      sessao.inputDadosSessao();

      await sessao.inserirDadosSessao();

      break;

    case 5:
      break;

    default:
      break;
  }
}

async function removerRegistros() {
  const filme = new Filme();
  const ingresso = new Ingresso();
  const sessao = new Sessao();

  menuRemoverRegistro();

  let opt = +scan("Opção: ");

  switch (opt) {
    case 1:
      await cliente.removerCliente();
      break;

    case 2:
      await filme.removerFilme();
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
      await filme.atualizarDadosFilme();
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
