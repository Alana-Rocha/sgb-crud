import { conexion } from "./database/conexion.js";
import { Query } from "./queries/query.js";

const query = new Query();

conexion.connect((err) => {
  if (err) throw err;
  console.log("Db connected");
});

query.criarTabelas();

