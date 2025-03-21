export class UsuariorolEntity {
    constructor(
        public rol_id: string,
        public usuario_id: string,
    ){}
}

export class UsuariorolEntityOu {
    constructor (
        public ok:boolean,
        public data: UsuariorolEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}