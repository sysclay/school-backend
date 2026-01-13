export class ColegioGradoEntity {
    constructor(
        public id_colegio: string,
        public id_nivel: string,
        public id_grado: string,
        public colegio: string,
        public nivel: string,
        public grado: string,
        public descripcion: string,
        public estado:boolean,
        public cantidad_seccion:number,
    ){}
}

export class ColegioGradoEntityOu {
    constructor (
        public ok:boolean,
        public data: ColegioGradoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}