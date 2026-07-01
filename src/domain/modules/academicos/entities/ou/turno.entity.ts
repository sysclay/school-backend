export class TurnoEntity {
    constructor(
        public id_turno: string,
        public turno: string,
        public descripcion: string,
        public estado: boolean,
        public created_at: Date,
    ){}
}

export class TurnoEntityOu {
    constructor (
        public ok:boolean,
        public data: TurnoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}