export class RegisterAniolectivoDto {
    private constructor (
        public anio: string,
        public colegio_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAniolectivoDto?]{
        const { anio, colegio_id } = object;
        if(!anio) return ["Missing año"];
        if(anio.length>4) return ["Missing año no valido"];
        if(!colegio_id) return ["Missing colegio"];
        return [
            undefined,
            new RegisterAniolectivoDto( anio, colegio_id),
        ]
    }
}