export class FilterApoderadoEntity {
    constructor(
        // public id: string,
        public alumno_id: string,
        public matricula_id: string,
        public turno: string,
        public nro_documento: string,
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public telefono: string,
        public grado: string,
        public alias: string,
        public descripcion: string,
        public seccion: string,
        public nivel: string,
        public anio: string,
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