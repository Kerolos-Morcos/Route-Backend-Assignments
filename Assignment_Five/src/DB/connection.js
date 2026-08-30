import mysql2 from "mysql2/promise";
import { Sequelize } from "sequelize";

const connection = await mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3407
});

await connection.query(
    "CREATE DATABASE IF NOT EXISTS assignment_5_db"
);
await connection.end();

export const sequelize = new Sequelize(
    "assignment_5_db",
    "root",
    "",
    {
        host: "localhost",
        port: 3407,
        dialect: "mysql",
        logging: false
    }
);