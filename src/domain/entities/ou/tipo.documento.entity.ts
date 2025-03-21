export class TipoDocumentoEntity {
    constructor(
        public id: string,
        public nom_largo: string,
        public nom_corto: string,
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