export class UsuarioEntityIn {
    constructor(
        public id: string,
        public nro_documento: string,
        public telefono: string,
        public correo: string,
    ){}
}