export class SeccionEntity {
    constructor(
        public id_nivel: string,
        public id_grado: string,
        public id_seccion: string,
        public nivel: string,
        public seccion: string,
        public grado: string,
        public descripcion: string,
        public estado: boolean,
    ){}
}

export class SeccionEntityOu {
    constructor (
        public ok:boolean,
        public data: SeccionEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}