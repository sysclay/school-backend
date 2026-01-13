export class PorteroEntity {
    constructor(
        public id_colegio: string,
        public colegio: string,
        public id_portero: string,
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

export class PorteroEntityOu {
    constructor (
        public ok:boolean,
        public data: PorteroEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}