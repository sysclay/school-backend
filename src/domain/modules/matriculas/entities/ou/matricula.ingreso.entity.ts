export class MatriculaIngresoEntity {
    constructor(
        public id_matricula_ingreso: string,
        public nombre: string,
        public descripcion: string,
        public estado: boolean,
    ){}
}

export class MatriculaIngresoEntityOu {
    constructor (
        public ok:boolean,
        public data: MatriculaIngresoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}