export class RegisterAsistenciaDto {
    private constructor (
        public matricula_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAsistenciaDto?]{
        const { matricula_id} = object;
        console.log(object)
        if(!matricula_id) return ["Missing matricula"];
        return [ 
            undefined,
            new RegisterAsistenciaDto(matricula_id ),
        ]
    }
}