import { ClienteModel } from "../models/ClienteModel";
import { FilmeModel } from "../models/FilmeModel";
import { IngressoModel } from "../models/IngressoModel";
import { SessaoModel } from "../models/SessaoModel";
import Relatorio from "../reports/relatorio";
import { logo } from "../utils/menu";
import { scan } from "../utils/scan";
import { ClienteController } from "./ClienteController";
import { FilmeController } from "./FilmeController";
import { IngressoController } from "./IngressoController";
import { SessaoController } from "./SessaoController";

export class MenuController {
  private readonly filmeController = new FilmeController();
  private readonly clienteController = new ClienteController();
  private readonly ingressoController = new IngressoController();
  private readonly sessaoController = new SessaoController();

  mostrarMenu() {
    console.log(`
${logo}

\nSISTEMA DE GERENCIAMENTO DE BILHETERIA DE CINEMA\n
  ESCOLHA UMA OPÇÃO:

  1 - RELATÓRIOS
  2 - INSERIR REGISTROS
  3 - REMOVER REGISTROS
  4 - ATUALIZAR REGISTROS
  5 - SAIR \n`);
  }

  async splashScreen() {
    const clientesQtd = await ClienteModel.count();
    const filmesQtd = await FilmeModel.count();
    const ingressosQtd = await IngressoModel.count();
    const sessoesQtd = await SessaoModel.count();

    console.log(`
======================================================================================================
\nSISTEMA DE GERENCIAMENTO DE BILHETERIA DE CINEMA
\nTOTAL DE REGISTROS EXISTENTES:

  1 - CLIENTES: ${clientesQtd}
  2 - FILMES: ${filmesQtd}
  3 - INGRESSOS: ${ingressosQtd}
  4 - SALAS: 5
  5 - SESSÕES: ${sessoesQtd}

CRIADO POR:
  ALANA ROCHA
  LUIZ DOMINISINI
  JULIANA SEITH
  JOÃO VICTOR SANTANA
  PATRICK TORREZANI

DISCIPLINA: BANCO DE DADOS - 2024/2
PROFESSOR: HOWARD ROATTI\n
======================================================================================================`);
  }

  async mostrarSubMenu(type: number) {
    switch (type) {
      case 1:
        await this.menuRelatorio();
        break;
      case 2:
        await this.menuCriar();
        break;
      case 3:
        await this.menuRemover();
        break;
      case 4:
        await this.menuAtualizar();
        break;
    }
  }

  private async menuCriar() {
    console.log(`
      1 - Cliente
      2 - Filme
      3 - Ingresso
      4 - Sessao
      5 - Voltar 
    `);

    const opt = +scan(">>> ");

    switch (opt) {
      case 1:
        await this.clienteController.inserir();
        break;
      case 2:
        await this.filmeController.inserir();
        break;
      case 3:
        await this.ingressoController.inserir();
        break;
      case 4:
        await this.sessaoController.inserir();
        break;
      case 5:
        break;
    }
  }

  private async menuAtualizar() {
    console.log(`
      1 - Cliente
      2 - Filme
      3 - Sessao
      4 - Voltar 
    `);

    const opt = +scan(">>> ");

    switch (opt) {
      case 1:
        await this.clienteController.atualizar();
        break;
      case 2:
        await this.filmeController.atualizar();
        break;
      case 3:
        await this.sessaoController.atualizar();
        break;
      case 4:
        break;
    }
  }

  private async menuRemover() {
    console.log(`
      1 - Cliente
      2 - Filme
      3 - Sessao
      4 - Voltar 
    `);

    const opt = +scan(">>> ");

    switch (opt) {
      case 1:
        await this.clienteController.excluir();
        break;
      case 2:
        await this.filmeController.excluir();
        break;
      case 3:
        await this.sessaoController.excluir();
        break;
      case 4:
        break;
    }
  }

  private async menuRelatorio() {
    console.log(`
    1 - Ingressos Vendidos
    2 - Sessões Atuais
    3 - Voltar
  `);

    const opt = +scan(">>> ");

    switch (opt) {
      case 1:
        await Relatorio.ingVendidos();
        scan("Pressione enter para continuar >>>");
        break;
      case 2:
        await Relatorio.sessoesAbertas();
        break;
      case 3:
        break;
    }
  }
}
