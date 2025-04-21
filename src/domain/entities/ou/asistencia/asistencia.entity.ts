export class AsistenciaEntity {
    constructor(
        public id: string,
        public matricula_id: string,
        public hora_entrada: string,
        public hora_salida: string,
        public registrador_entrada: string,
        public registrador_salida: string,
        public tardanza: boolean,
        public falta: boolean,
    ){}
}

export class AsistenciaEntityOu {
    constructor (
        public ok:boolean,
        public data: AsistenciaEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}