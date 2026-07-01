// import { Validators } from "../../../utils/index.js";

export class FilterAsistenciaDto {
    private constructor (
        public id_matricula?: string,
        public id_asistencia_programado?: string,
        public fecha?: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterAsistenciaDto?]{
        const { id_asistencia_programado,fecha,id_matricula } = object;
        if(!id_asistencia_programado && !id_matricula && !fecha) return ["Missing parameters to filter Asistencia"];
        return [ 
            undefined,
            new FilterAsistenciaDto(id_matricula, id_asistencia_programado, fecha),
        ]
    }
}