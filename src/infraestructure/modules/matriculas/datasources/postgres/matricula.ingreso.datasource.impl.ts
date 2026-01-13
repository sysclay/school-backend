import { CustomError, MatriculaIngresoDatasource, MatriculaIngresoEntityOu } from "../../../../../domain/index.js";
import { MatriculaIngresoMapper } from "../../mappers/matricula.ingreso.mapper.js";

import { PostgresConnection } from "../../../../database/postgres/index.js";

export class MatriculaIngresoDatasourceImpl implements MatriculaIngresoDatasource { 

    async findAll(): Promise<MatriculaIngresoEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_matricula_ingreso");
            if (result) {
                return MatriculaIngresoMapper.findEntityFromObject({ ok: true, data: result.rows, message: 'Operación exitosa' });
            }
            return MatriculaIngresoMapper.findEntityFromObject({ ok: false, message: 'Error' });
        } catch (error) {
            if (error instanceof CustomError) { throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllActive(): Promise<MatriculaIngresoEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_matricula_ingreso WHERE estado=true");
            if (result) {
                return MatriculaIngresoMapper.findEntityFromObject({ ok: true, data: result.rows, message: 'Operación exitosa' });
            }
            return MatriculaIngresoMapper.findEntityFromObject({ ok: false, message: 'Error' });
        } catch (error) {
            if (error instanceof CustomError) { throw error; }
            throw CustomError.internalServer();
        }
    }

    async findById(): Promise<MatriculaIngresoEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_matricula_ingreso");
            if (result) {
                return MatriculaIngresoMapper.findEntityFromObject({ ok: true, data: result.rows, message: 'Operación exitosa' });
            }
            return MatriculaIngresoMapper.findEntityFromObject({ ok: false, message: 'Error' });
        } catch (error) {
            if (error instanceof CustomError) { throw error; }
            throw CustomError.internalServer();
        }
    }

}