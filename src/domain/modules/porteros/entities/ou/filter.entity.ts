export class FilterPorteroEntity {
    constructor(
        public id_colegio: string,
        public nro_docu: string,
        public alumno: string,
    ){}
}

export class FilterPorteroEntityOu {
    constructor (
        public ok:boolean,
        public data: FilterPorteroEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}