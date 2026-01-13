export class TipoDocumentoEntity {
    constructor(
        public id_documento: string,
        public nom_doc: string,
        public nom_abr: string,
        public longitud: number,
    ){}
}

export class TipoDocumentoEntityOu {
    constructor (
        public ok:boolean,
        public data: TipoDocumentoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}