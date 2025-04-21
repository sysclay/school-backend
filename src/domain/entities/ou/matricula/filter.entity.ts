export class FilterMatriculaEntity {
    constructor(
        public id: string,
        public turno: string,
        public fecha: string,
        public hora_entrada: string,
        public hora_salida: string,
        public tardanza: boolean,
        public nombre_institucion: string,
        public nivel: string,
        public grado: string,
        public seccion: string,
    ){}
}

export class FilterMatriculaEntityOu {
    constructor (
        public ok:boolean,
        public data: FilterMatriculaEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}