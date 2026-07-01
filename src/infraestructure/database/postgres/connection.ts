
import pg from "pg";
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


export class PostgresConnection {
    private static pool: InstanceType<typeof Pool>;

    static async connect(options:Options){
        const { user, host, database, password, port, ssl, connectionString } = options;
        if (!this.pool) {
            // this.pool = new Pool({user,host, database, password, port, ssl:ssl===true ?{ rejectUnauthorized: false }:ssl});
            this.pool = new Pool({connectionString, ssl:ssl===true ?{ rejectUnauthorized: false }:ssl});
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