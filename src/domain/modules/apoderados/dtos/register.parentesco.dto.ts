export class RegisterParentescoDto {
    private constructor (
        public cod_parentesco: string,
        public nom_parentesco: string,
    ){}


    static create(object:{[key:string]:any}):[string?,RegisterParentescoDto?]{
        const { cod_parentesco, nom_parentesco} = object;

        if(!cod_parentesco) return ["Missing cod_parentesco"];
        if(!nom_parentesco) return ["Missing nom_parentesco"];
        return [
            undefined,
            new RegisterParentescoDto( cod_parentesco, nom_parentesco ),
        ]
    }
}