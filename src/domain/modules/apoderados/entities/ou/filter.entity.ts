export class FilterApoderadoEntity {
    constructor(
        public id_colegio: string,
        public nro_docu: string,
        public alumno: string,
    ){}
}

export class FilterApoderadoEntityOu {
    constructor (
        public ok:boolean,
        public data: FilterApoderadoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}