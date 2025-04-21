export class TokenEntity {
    constructor(
        public id: string,
        public username: string,
        public nro_documento: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public correo: string,
        public telefono: string,
    ){}
}

export class TokenEntityOu {
    constructor (
        public ok:boolean,
        public data: TokenEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}