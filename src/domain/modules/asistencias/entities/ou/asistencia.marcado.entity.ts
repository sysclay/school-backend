export class AsistenciaMarcadoEntity {
    constructor(
        // Identificadores
        public id_grupo:           string,
        public id_matricula:       string,
        public id_programado:      string,
        public id_asistencia:      string | null,

        // Info del grupo
        public anio_academico:     string,
        public capacidad:          number,

        // Info del día lectivo
        public fecha:              string,
        public dia_semana:         string,
        public hora_inicio:        string,
        public hora_fin:           string,
        public descripcion_clase:  string | null,

        // Registro de asistencia (null si no existe)
        public hora_llegada:       string | null,
        public hora_salida:        string | null,
        public justificacion:      string | null,
        public estado_nombre:      string | null,
        public estado_descripcion: string | null,
        public fecha_entrada:      string | null,
        public fecha_salida:       string | null,

        // Flags calculados por el procedure
        public ausencia_automatica: boolean,
        public sin_salida:          boolean,
    ) {}

    // ── Helpers de estado ───────────────────────────────────────────────────

    /** El alumno tiene algún registro de asistencia */
    tieneRegistro(): boolean {
        return this.id_asistencia !== null;
    }

    /** Día pasado sin ningún registro */
    esAusenciaAutomatica(): boolean {
        return this.ausencia_automatica;
    }

    /** Marcó entrada pero nunca salida y ya pasó la hora */
    esSinSalida(): boolean {
        return this.sin_salida;
    }

    /** Estado visual para el UI */
    getEstadoUI(): "presente" | "tarde" | "justificado" | "ausente" | "sin_salida" | "sin_registro" | "futuro" {
        if (this.sin_salida)          return "sin_salida";
        if (!this.tieneRegistro()) {
            if (this.ausencia_automatica) return "ausente";
            return "futuro";           // día futuro sin registro aún
        }
        switch (this.estado_nombre?.toLowerCase()) {
            case "presente":     return "presente";
            case "tarde":        return "tarde";
            case "justificado":  return "justificado";
            case "ausente":      return "ausente";
            default:             return "sin_registro";
        }
    }
}

export class AsistenciaMarcadoEntityOu {
    constructor(
        public ok:      boolean,
        public data:    AsistenciaMarcadoEntity[] | null | undefined,
        public message: string,
    ) {}

    hasValidData(): boolean {
        return Array.isArray(this.data) && this.data.length > 0;
    }

    /** Filtra solo días con registro de asistencia */
    conRegistro(): AsistenciaMarcadoEntity[] {
        return this.data?.filter(d => d.tieneRegistro()) ?? [];
    }

    /** Filtra días sin ningún registro */
    sinRegistro(): AsistenciaMarcadoEntity[] {
        return this.data?.filter(d => !d.tieneRegistro()) ?? [];
    }

    /** Filtra días con alerta de salida pendiente */
    conAlertaSalida(): AsistenciaMarcadoEntity[] {
        return this.data?.filter(d => d.sin_salida) ?? [];
    }

    /** Filtra ausencias automáticas (días pasados sin registro) */
    ausenciasAutomaticas(): AsistenciaMarcadoEntity[] {
        return this.data?.filter(d => d.ausencia_automatica) ?? [];
    }
}