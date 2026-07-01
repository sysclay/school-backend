export class ColegioSeccionEntity {
    constructor(
        public id_colegio: string,
        public id_nivel: string,
        public id_grado: string,
        public id_seccion: string,
        public colegio: string,
        public nivel: string,
        public grado: string,
        public seccion: string,
        public descripcion: string,
        public estado:boolean,
    ){}
}

export class ColegioSeccionEntityOu {
    constructor (
        public ok:boolean,
        public data: ColegioSeccionEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}