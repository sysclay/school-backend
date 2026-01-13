export class ColegioEntity {
    constructor(
        public id_colegio: string,
        public colegio: string,
        public direccion: string,
        public correo: string,
        public telefono: string,
        public estado:boolean,
        public created_at: string,
        public cantidad_nivel:number,
        public cantidad_grado:number,
        public cantidad_seccion:number,
    ){}
}

export class ColegioEntityOu {
    constructor (
        public ok:boolean,
        public data: ColegioEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}