export class MatriculaEntity {
    constructor(
        public id: string,
        public alumno_id: string,
        public apoderado_id: string,
        public seccion_id: string,
    ){}
}

export class MatriculaEntityOu {
    constructor (
        public ok:boolean,
        public data: MatriculaEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}