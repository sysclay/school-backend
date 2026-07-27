// import { Validators } from "../../../utils/index.js";

export class ResumenDayDto {
    private constructor (
        // public id_matricula?: string,
        public id_asistencia_programada?: string,
        // public fecha?: string,
    ){}

    static resumenDay(object:{[key:string]:any}):[string?,ResumenDayDto?]{
        const { id_asistencia_programada } = object;
        if(!id_asistencia_programada) return ["Missing parameters to filter Asistencia"];
        return [ 
            undefined,
            new ResumenDayDto(id_asistencia_programada),
        ]
    }
}