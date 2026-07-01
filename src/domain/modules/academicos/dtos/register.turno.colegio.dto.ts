export class RegisterTurnoColegioDto {
    private constructor (
        public id_colegio: string,
        public id_turno: string,
        public hora_ini: string,
        public hora_fin: string,
    ){}
    private static isValidTime(time: string): boolean {
        if (!time || typeof time !== 'string') return false;
        
        const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
        return regex.test(time.trim());
    }

    private static isTimeValidOrder(hora_ini: string, hora_fin: string): boolean {
        return hora_ini < hora_fin; // Comparación lexicográfica funciona para HH:mm
    }

    static create(object:{[key:string]:any}):[string?,RegisterTurnoColegioDto?]{
        const { id_colegio,id_turno, hora_ini, hora_fin } = object;
        if(!id_colegio) return ["Missing id_colegio"];
        if(!id_turno) return ["Missing id_turno"];
        if(!hora_ini) return ["Missing hora inicio"];
        if (!this.isValidTime(hora_ini)) return [`Invalid format for hora_ini: ${hora_ini}. Expected HH:mm`];

        if(!hora_fin) return ["Missing hora fin"];
        if (!this.isValidTime(hora_fin)) return [`Invalid format for hora_fin: ${hora_fin}. Expected HH:mm`];
        
        if (!this.isTimeValidOrder(hora_ini, hora_fin)) {
        return ['La hora de inicio debe ser menor que la hora de fin'];
        }

        return [
            undefined,
            new RegisterTurnoColegioDto(id_colegio,id_turno,hora_ini, hora_fin),
        ]
    }
}