export class AniolectivoEntity {
    constructor(
        public id: string,
        public anio: string,
        public colegio_id: string,
    ){}
}

export class AniolectivoEntityOu {
    constructor (
        public ok:boolean,
        public data: AniolectivoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}