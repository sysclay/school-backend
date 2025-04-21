import { Validators } from "../../../utils/index.js";

export class RegisterAsistenciaDto {
    private constructor (
        public matricula_id: string,
        public hora_entrada: string,
        public hora_llegada: string,
        public registrador_entrada: string,
        public fecha:string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAsistenciaDto?]{
        const { matricula_id, hora_entrada, hora_llegada, registrador_entrada} = object;
        if(!matricula_id) return ["Missing matricula"];
        if(!hora_entrada) return ["Missing entrada"];
        if(!registrador_entrada) return ["Missing registrador"];

        const fechaActual = Validators.isFechaPeru();
        const horaActual = Validators.isHoraPeru();

        const entradaDate = new Date(`${fechaActual}T${hora_entrada}Z`);
        if (isNaN(entradaDate.getTime())) { return ["Formato de hora entrada inválido"]; }
        // Si no se envía hora_llegada, usar hora actual del sistema
        const horaLlegadaFinal = (!hora_llegada || hora_llegada.trim() === '')? horaActual: hora_llegada;
        const llegadaDate = new Date(`${fechaActual}T${horaLlegadaFinal}Z`);

        if (isNaN(llegadaDate.getTime())) { return ["Formato de hora llegada inválido"];}
        return [ 
            undefined,
            new RegisterAsistenciaDto(matricula_id, hora_entrada, horaLlegadaFinal, registrador_entrada, fechaActual ),
        ]
    }
}