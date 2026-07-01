export class FilterPersonaDto {
    private constructor (
        public nro_documento: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterPersonaDto?]{
        const {  nro_documento } = object;
        if(!nro_documento) return ["Missing numero documento"];
        return [
            undefined,
            new FilterPersonaDto(nro_documento), 
        ]
    }
}