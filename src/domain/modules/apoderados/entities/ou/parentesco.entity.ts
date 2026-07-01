export class ParentescoEntity {
    constructor(
        public id_parentesco: string,
        public cod: string,
        public parentesco: string,
        public estado: boolean,
        public created_at: string,
    ){}
}

export class ParentescoEntityOu {
    constructor (
        public ok:boolean,
        public data: ParentescoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}