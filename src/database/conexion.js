import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

export const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

export async function connectDB() {
  try {
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        console.log(err);
        if (err) {
          return reject("Erro ao conectar ao banco de dados: " + err.message);
        }
        console.log("CONECTADO");
        resolve("Conectado");
      });
    });
  } catch (error) {
    console.error(error.message);
  }
}
