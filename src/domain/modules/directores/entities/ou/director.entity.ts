export class DirectorEntity {
    constructor(
        public id_persona: string,
        public id_colegio: string,
        public id_rol: string,
        public nro_documento: string,
        public nombre_completo: string,
        public correo: string,
        public telefono: string,
        public colegio: string,
        // public cip: string,
        // public formacion_academica: string,
        public estado: boolean,
    ){}
}

export class DirectorEntityOu {
    constructor (
        public ok:boolean,
        public data: DirectorEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}