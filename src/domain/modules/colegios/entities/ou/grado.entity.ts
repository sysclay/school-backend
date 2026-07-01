export class GradoEntity {
    constructor(
        public id_nivel: string,
        public id_grado: string,
        public nivel: string,
        public codigo: string,
        public grado: string,
        public abreviado: string,
        public descripcion: string,
        public estado: boolean,
        public cantidad_seccion: number,
    ){}
}

export class GradoEntityOu {
    constructor (
        public ok:boolean,
        public data: GradoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}