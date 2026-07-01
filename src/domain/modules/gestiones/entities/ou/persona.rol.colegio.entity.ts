export class PersonaRolColegioEntity {
    constructor(
        public id_persona: string,
        public nombre_completo: string,
        public correo: string,
        public foto: string,
        public colegios: {
            id_colegio: string,
            nombre_colegio: string,
            roles: {
                id_rol:string,
                nombre_rol:string,
                estado:boolean,
            }[]
        }[],
    ){}
}

export class PersonaRolColegioEntityOu {
    constructor (
        public ok:boolean,
        public data: PersonaRolColegioEntity | null| undefined,
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