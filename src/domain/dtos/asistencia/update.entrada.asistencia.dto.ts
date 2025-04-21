import { Validators } from '../../../utils/index.js';
export class UpdateEntradaAsistenciaDto {
    private constructor (
        public hora_entrada: string,
        public hora_llegada: string,
        public registrador_entrada: string,
        public tardanza: boolean,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateEntradaAsistenciaDto?]{
        const { hora_entrada,hora_llegada, registrador_entrada} = object;

        if(!hora_entrada) return ["Missing entrada"];
        if(!registrador_entrada) return ["Missing registrador"];

        const fechaActual = Validators.isFechaPeru();
        const horaActual = Validators.isHoraPeru();

        const entradaDate = new Date(`${fechaActual}T${hora_entrada}Z`);
        if (isNaN(entradaDate.getTime())) { return ["Formato de hora entrada inválido"]; }
        // Si no se envía hora_llegada, usar hora actual del sistema
        const horaLlegadaFinal = (!hora_llegada || hora_llegada.trim() === '')? horaActual: hora_llegada;
        const llegadaDate = new Date(`${fechaActual}T${horaLlegadaFinal}Z`);

        if (isNaN(llegadaDate.getTime())) {
            return ["Formato de hora llegada inválido"];
        }
         // Comparar diferencia en minutos
        const diffMin = (llegadaDate.getTime() - entradaDate.getTime()) / (1000 * 60);

        if (diffMin < -60) { return ["Solo se puede registrar desde 1 hora antes de la hora de entrada"]; }
        if (diffMin > 60) { return ["Hora de llegada fuera de rango, ya se considera falta"]; }
    
        const tardanza = diffMin > 0;
        return [ 
            undefined,
            new UpdateEntradaAsistenciaDto(hora_entrada,horaLlegadaFinal,registrador_entrada, tardanza),
        ]
    }
}