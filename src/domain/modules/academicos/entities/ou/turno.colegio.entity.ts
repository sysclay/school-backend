export class TurnoColegioEntity {
    constructor(
        public id_turno_colegio: string,
        public id_colegio: string,
        public colegio: string,
        public turno: string,
        public hora_inicio: string,
        public hora_fin: string,
        public estado: boolean,
        public created_at: Date,
    ){}
}

export class TurnoColegioEntityOu {
    constructor (
        public ok:boolean,
        public data: TurnoColegioEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}