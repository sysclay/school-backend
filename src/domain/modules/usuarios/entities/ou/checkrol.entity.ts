export class CheckRolEntity {
    constructor(
        // public id: string,
        // public codigo: string,
        // public username: string,
        // public nro_documento:string,
        // public nombre:string,
        // public paterno:string,
        // public materno:string,
        // public correo:string,
        // public telefono:string,
        // public token: string,
    ){}
}

export class CheckRolEntityOu {
    constructor (
        public ok:boolean,
        // public data: UsuarioEntity | null| undefined,
        public message: string,
        public token?: string,
    ){}

    // Método opcional para verificar el estado de `data`
    // hasValidData(): boolean {
    //     return this.data !== undefined && this.data !== null;
    // }
}