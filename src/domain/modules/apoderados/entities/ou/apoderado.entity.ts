export class ApoderadoEntity {
    constructor(
        public id_colegio: string,
        public colegio: string,
        public id_apoderado: string,
        public nro_doc: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public telefono: string,
        public correo: string,
        public estado: boolean,
        public created_at: string,
    ){}
}

export class ApoderadoEntityOu {
    constructor (
        public ok:boolean,
        public data: ApoderadoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}