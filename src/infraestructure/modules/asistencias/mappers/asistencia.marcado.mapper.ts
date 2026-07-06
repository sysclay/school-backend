import { CustomError, AsistenciaMarcadoEntity, AsistenciaMarcadoEntityOu } from "../../../../domain/index.js";

export class AsistenciaMarcadoMapper {

    // ── Mapear un solo objeto raw → AsistenciaMarcadoEntity ──────────────────────
    private static toEntity(data: { [key: string]: any }): AsistenciaMarcadoEntity {
        return new AsistenciaMarcadoEntity(
            data.id_grupo,
            data.id_matricula,
            data.id_programado,
            data.id_asistencia      ?? null,
            data.anio_academico,
            data.capacidad,
            data.fecha,
            data.dia_semana,
            data.hora_inicio,
            data.hora_fin,
            data.descripcion_clase  ?? null,
            data.hora_llegada       ?? null,
            data.hora_salida        ?? null,
            data.justificacion      ?? null,
            data.estado_nombre      ?? null,
            data.estado_descripcion ?? null,
            data.fecha_entrada      ?? null,
            data.fecha_salida       ?? null,
            data.ausencia_automatica ?? false,
            data.sin_salida          ?? false,
        );
    }

    // ── Un solo registro (INSERT / UPDATE) ───────────────────────────────────
    static AsistenciaMarcadoEntityFromObject(object: { [key: string]: any }): AsistenciaMarcadoEntityOu {
        const { ok, data, message } = object;

        if (data !== undefined && data !== null) {
            return new AsistenciaMarcadoEntityOu(
                ok,
                [AsistenciaMarcadoMapper.toEntity(data)],
                message,
            );
        }

        return new AsistenciaMarcadoEntityOu(ok, data, message);
    }

    // ── Buscar por ID (findById) ──────────────────────────────────────────────
    static findByIdEntityFromObject(object: { [key: string]: any }): AsistenciaMarcadoEntityOu {
        const { ok, data, message } = object;

        if (data) {
            return new AsistenciaMarcadoEntityOu(
                ok,
                [AsistenciaMarcadoMapper.toEntity(data)],
                message,
            );
        }

        return new AsistenciaMarcadoEntityOu(ok, undefined, message);
    }

    // ── Lista (procedure / filtro) ────────────────────────────────────────────
    static findEntityFromObject(object: { [key: string]: any }): AsistenciaMarcadoEntityOu {
        const { ok, data, message } = object;

        if (data !== undefined && data !== null) {
            const _data: AsistenciaMarcadoEntity[] = data.map(
                (item: any) => AsistenciaMarcadoMapper.toEntity(item)
            );

            return new AsistenciaMarcadoEntityOu(ok, _data, message);
        }

        return new AsistenciaMarcadoEntityOu(ok, data, message);
    }
}