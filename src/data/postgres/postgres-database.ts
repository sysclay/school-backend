// import path from "path";
import pg from "pg";

// import fs from 'fs';
// import { fileURLToPath } from "url";
const { Pool } = pg;

interface Options {
    user: string,
    host: string,
    database: string,
    password: string,
    port: number,
    ssl:boolean | { rejectUnauthorized: boolean } ,
    connectionString?:string,
}

// Obtener la ruta absoluta del archivo actual
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Construir la ruta al archivo SQL
// const schemaPath = path.join(__dirname, 'db', 'schema.sql');

// console.log('📂 Archivo SQL en:', schemaPath);

export class PostgresDatabase {
    private static pool: InstanceType<typeof Pool>;

    static async connect(options:Options){
        const { user, host, database, password, port, ssl, connectionString } = options;

        if (!this.pool) {

            this.pool = new Pool({user,host, database, password, port, ssl:ssl===true ?{ rejectUnauthorized: false }:ssl});
            // this.pool = new Pool({connectionString, ssl:ssl===true ?{ rejectUnauthorized: false }:ssl});

            try {
                console.log('Conexión exitosa 🎉')
            } catch (error) {
                console.error('Error al conectar a la base de datos:', error);
                process.exit(1);
            }
        }
        return this.pool;
    }    

    static getPool(): InstanceType<typeof Pool> {
        if (!this.pool) {
            throw new Error("⚠️ La base de datos no está conectada.");
        }
        return this.pool;
    }
}