import express, { Router } from "express"
import path ,{} from "path"
import cors from 'cors';
import { fileURLToPath } from "url";

interface Options {
    port?:number;
    routes: Router;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Server {
    private readonly app = express();
    private readonly port:number;
    private readonly routes:Router;


    constructor(
        options:Options,
    ){
        const { port = 3000, routes }= options;
        this.port = port;
        this.routes =routes;
    }

    async start(){
        this.app.use(cors({exposedHeaders:['Authorization']}));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));

        this.app.use(express.static(path.join(__dirname, '../public')));

        this.app.use(this.routes);

        //Ruta principal       
        this.app.get('/',(req,res)=> {
            res.sendFile(path.join(__dirname,'../public/index.html'))
            }
        );

        // Escuchar en el puerto dinámico
        const port = process.env.PORT || this.port;
        this.app.listen(port,()=> {
            console.log(`Server running on port ${this.port}`)
        })
        
    }
}