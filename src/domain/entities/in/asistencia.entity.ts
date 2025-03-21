export class AsistenciaEntityIn {
    constructor(
        public id: string,
        public matricula_id: string,
        public hora_entrada: string,
        public hora_salida: string,
        public registrador_entrada: string,
        public registradorsalida: string,
        public tardanza: boolean,
        public falta: boolean,
    ){}
}