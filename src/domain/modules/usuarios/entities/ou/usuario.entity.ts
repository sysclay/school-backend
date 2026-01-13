export class UsuarioEntity {
    constructor(
        public id_usuario: string,
        public id_persona: string,
        public username: string,
        public nro_documento:string,
        public nombre:string,
        public paterno:string,
        public materno:string,
        public estado: boolean,
    ){}
}

export class UsuarioEntityOu {
    constructor (
        public ok:boolean,
        public message: string,
        public data?: UsuarioEntity | null 
    ){}

    // Método opcional para verificar el estado de `data`
    // hasValidData(): boolean {
    //     return this.data !== undefined && this.data !== null;
    // }
}