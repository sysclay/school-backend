export class AlumnoEntity {
    constructor(
        public id: string,
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public nro_documento: string,
        //public codigo_qr: string,
        public tipo_documento_id: string,
    ){}
}

export class AlumnoEntityOu {
    constructor (
        public ok:boolean,
        public data: AlumnoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}