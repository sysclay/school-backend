export class RegisterTipoDocumentoDto {
    private constructor (
        public nom_largo: string,
        public nom_corto: string,
        public longitud: number,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterTipoDocumentoDto?]{
        const { nom_largo, nom_corto, longitud } = object;
        if(!nom_largo) return ["Missing nom_largo"];
        if(!nom_corto) return ["Missing nom_corto"];
        if(!longitud) return ["Missing longitud"];
        return [
            undefined,
            new RegisterTipoDocumentoDto(nom_largo, nom_corto, longitud),
        ]
    }
}