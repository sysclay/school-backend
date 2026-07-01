export class PersonaEntity {
    constructor(
        public id_persona: string,
        public id_documento: string,
        public nom_doc: string,
        public nro_doc: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public telefono : string,
        public correo : string,
        public direccion: string,
        public id_genero: string,
        public nom_gen: string,
        public fecha_nacimiento: string,
        public foto: string,
        public estado: boolean,
        public created_at: string,
        public created_by: string,
    ){}
}

export class PersonaEntityOu {
    constructor (
        public ok:boolean,
        public data: PersonaEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}