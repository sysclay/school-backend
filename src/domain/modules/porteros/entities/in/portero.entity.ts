export class PorteroEntityIn {
    constructor(
        public id: string,
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public nro_documento: string,
        public tipo_documento_id: string,
    ){}
}