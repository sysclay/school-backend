export class ApoderadoEntity {
    constructor(
        public id: string,
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public nro_documento: string,
        public tipo_documento_id: string,
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