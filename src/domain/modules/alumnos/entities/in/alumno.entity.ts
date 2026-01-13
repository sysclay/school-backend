export class AlumnoEntityIn {
    constructor(
        public id: string,
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public nro_documento: string,
        public codigo_qr: string,
        public tipo_documento_id: string,
    ){}
}