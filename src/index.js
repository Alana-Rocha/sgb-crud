import { text } from "stream/consumers";
import { conexion } from "./database/conexion.js";
import { Query } from "./queries/query.js";
import PromptSync from "prompt-sync";

const scan = PromptSync();
const query = new Query();
conexion.connect();
query.criarTabelas();

async function main() {
  let opt;
  while (opt !== 0) {
    console.log(`
      \n GERENCIAMENTO HOTEL \n
      1 - RELATÓRIOS
      2 - INSERIR RELATÓRIO
      3 - ATUALIZAR RELATÓRIO
      4 - REMOVER RELATÓRIO
      0 - SAIR \n
  `);

    opt = +scan("Opção: ");

    switch (opt) {
      case 0:
        console.log("Saindo...");
        conexion.end();
        break;
      case 2:
        await insert();
        scan("Enter para continuar...");
        console.clear();
        break;
    }
  }
}

async function insert() {
  const nome = scan("Nome: ");
  const email = scan("Email: ");
  const senha = scan("Senha: ");
  const result = await query.inserirDadosTabela(nome, email, senha);
  if (result) {
    console.log("\nDados Inseridos\n\n");
  } else {
    console.log("\nErro ao alocar dados\n");
  }
}

main();
