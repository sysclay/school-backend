export class UpdateEntradaAsistenciaDto {
    private constructor (
        public hora_entrada: string,
        public registrador_entrada: string,
        public tardanza: boolean,
    ){}

    static create(object:{[key:string]:any}):[string?,UpdateEntradaAsistenciaDto?]{
        const { hora_entrada, registrador_entrada} = object;

        if(!hora_entrada) return ["Missing entrada"];
        if(!registrador_entrada) return ["Missing registrador"];
        const horaEntradaDate = new Date(hora_entrada);
        // 📌 Verificar si es una fecha válida
        if (isNaN(horaEntradaDate.getTime())) { return ["Invalid hora salida format"]; }
        // 📌 Extraer la fecha actual en formato YYYY-MM-DD
        const today = new Date();
        const fechaHoy = today.toISOString().split("T")[0]; // Ej: "2025-03-09"
        const fechaSalida = horaEntradaDate.toISOString().split("T")[0]; // Ej: "2025-03-09"

        // 📌 Validar que la fecha de `hora_salida` sea hoy
        if (fechaHoy !== fechaSalida) {
            return ["hora entrada debe ser del día actual"];
        }
            // 📌 Extraer la hora
        const horas = horaEntradaDate.getHours();

        // 📌 Validar que `hora_salida` esté en los rangos permitidos
        const rangoPermitido = (horas >= 7 && horas < 9) || (horas >= 12 && horas < 14);
        const puntual = (horas >= 7 && horas < 8) || (horas >= 12 && horas < 13);
        const tarde = (horas >= 8 && horas < 9) || (horas >= 13 && horas < 14);

        if (!rangoPermitido) {
            return ["hora entrada fuera del rango permitido"];
        }

        const tardanza = puntual?false:tarde?true:false;
        return [ 
            undefined,
            new UpdateEntradaAsistenciaDto(hora_entrada, registrador_entrada, tardanza),
        ]
    }
}