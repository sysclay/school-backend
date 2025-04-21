import { envspg, JwtAdapter } from './config/index.js';
import { PostgresDatabase } from './data/postgres/index.js';
import { AppRouter } from './presentation/routes.js';
import { Server } from "./presentation/server.js";


(()=>{
    main();
})()

async function main() {

    await PostgresDatabase.connect({
        database:envspg.POSTGRES_DATABASE,
        host:envspg.POSTGRES_HOST,
        password:envspg.POSTGRES_PASSWORD,
        port:envspg.POSTGRES_PORT,
        user:envspg.POSTGRES_USER,
        ssl:envspg.POSTGRES_SSL,
        connectionString:envspg.POSTGRES_CONNECTION_STRING,
    });

    new Server({port:Number(envspg.PORT), routes: AppRouter.routes }).start();

}