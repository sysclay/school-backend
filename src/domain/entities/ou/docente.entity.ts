export class DocenteEntity {
    constructor(
        public id: string,
        public codigo_id: string,
        public doc_tipo: string,
        public nro_documento: string,
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public correo: string,
        public telefono: string,
        public estado: boolean,
    ){}
}

export class DocenteEntityOu {
    constructor (
        public ok:boolean,
        public data: DocenteEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}