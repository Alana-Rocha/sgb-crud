import { executeQuery } from "../database/connection";

type ClienteModelProps = {
  cpf: string;
  nome: string;
  idade: number;
};

export class ClienteModel implements ClienteModelProps {
  cpf: string;
  nome: string;
  idade: number;

  constructor(props: ClienteModelProps) {
    Object.assign(this, props);
  }

  static async create(cliente: ClienteModel) {
    const sql = `INSERT INTO cliente (cpf, nome_cliente, idade) VALUES ("${cliente.cpf}", "${cliente.nome}", ${cliente.idade})`;
    await executeQuery(sql);
  }

  static async count() {
    const sql = "SELECT COUNT(*) AS clienteQtd FROM cliente";
    const result = await executeQuery<{ clienteQtd: number }[]>(sql);
    return result[0].clienteQtd;
  }

  static async findByCpf(cpf: string) {
    const sql = `SELECT * FROM cliente WHERE cpf = "${cpf}"`;
    const cliente = await executeQuery<ClienteModel[]>(sql);
    return cliente[0];
  }

  static async read() {
    const sql = "SELECT * FROM cliente";
    const clientes = await executeQuery<ClienteModel[]>(sql);
    return console.table(clientes);
  }

  static async update(cliente: ClienteModel) {
    const sql = `
    UPDATE mydb.cliente
    SET nome_cliente = '${cliente.nome}',
        idade = '${cliente.idade}'
    WHERE cpf = ${cliente.cpf}; 
`;
    await executeQuery(sql);
    console.log("\nCliente atualizado com sucesso!\n");
    return;
  }

  static async delete(cpf: string) {
    const sql = `DELETE FROM ingressos WHERE cpf_cliente = "${cpf}";
                 DELETE FROM cliente WHERE cpf = "${cpf}";`;
    await executeQuery(sql);
  }
}
