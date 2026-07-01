// import { Validators } from "../../../utils/index.js";

export class RegisterAsistenciaProgramadoDto {
    private constructor (
        public id_grupo_academico: string,
        public fecha:Date,
        public dia_semana: string,
        public hora_inicio: string,
        public hora_fin: string,
        public desc: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAsistenciaProgramadoDto?]{
        const { id_grupo_academico, fecha, dia_semana, hora_inicio, hora_fin, desc} = object;
        if(!id_grupo_academico) return ["Missing id_grupo_academico"];
        if(!fecha) return ["Missing fecha"];
        if(!dia_semana) return ["Missing dia_semana"];
        if(!hora_inicio) return ["Missing hora_inicio"];
        if(!hora_fin) return ["Missing hora_fin"];

        const descLimpio = desc ? desc.trim() : '';
        const finalDesc = descLimpio || 'Duración estándar del periodo escolar';
        return [ 
            undefined,
            new RegisterAsistenciaProgramadoDto(id_grupo_academico, fecha, dia_semana, hora_inicio, hora_fin, finalDesc ),
        ]
    }
}