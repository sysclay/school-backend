// import { Validators } from "../../../utils/index.js";

export class FilterAsistenciaProgramadoDto {
    private constructor (
        public id_grupo_academico?: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterAsistenciaProgramadoDto?]{
        // const { id_grupo_academico } = object;
        const id_grupo_academico =
        typeof object.id_grupo_academico === 'string' && object.id_grupo_academico.trim() !== ''
            ? object.id_grupo_academico.trim()
            : undefined;
        // if(!id_grupo_academico) return ["Missing id_grupo_academico"];
        return [ 
            undefined,
            new FilterAsistenciaProgramadoDto(id_grupo_academico ),
        ]
    }
}