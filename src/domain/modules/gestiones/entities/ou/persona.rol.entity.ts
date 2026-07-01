export class PersonaRolEntity {
    constructor(
        public id_persona: string,
        public tipo_documento: string,
        public nro_documento: string,
        public nombre: string,
        public paterno: string,
        public materno:boolean,
        public foto: string,
        public estado:number,
        public roles: {
            id_rol: string,
            nombre: string,
            estado: boolean,
        }[],
    ){}
}

export class PersonaRolEntityOu {
    constructor (
        public ok:boolean,
        public data: PersonaRolEntity | null| undefined,
        public message: string,
        public total?: number,
        public page?: number,
        public limit?: number,
        public totalPages?: number,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }

    // Método para calcular el total de páginas
    calculateTotalPages(): number {
        if (this.total && this.limit) {
            return Math.ceil(this.total / this.limit);
        }
        return 0;
    }
}