export class ColegioEntity {
    constructor(
        public id: string,
        public nombre_institucion: string,
        public correo: string,
        public telefono: string,
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