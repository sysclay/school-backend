export class ColegioNivelEntity {
    constructor(
        public id_colegio: string,
        public id_nivel: string,
        public colegio: string,
        public nivel: string,
        public estado:boolean,
        public cantidad_grado:number,
        public cantidad_seccion:number,
    ){}
}

export class ColegioNivelEntityOu {
    constructor (
        public ok:boolean,
        public data: ColegioNivelEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}