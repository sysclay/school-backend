export class MatriculaEstadoEntity {
    constructor(
        public id_matricula_estado: string,
        public nombre: string,
        public descripcion: string,
        public estado: boolean,
    ){}
}

export class MatriculaEstadoEntityOu {
    constructor (
        public ok:boolean,
        public data: MatriculaEstadoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}