import { CustomError, MatriculaEstadoDatasource, MatriculaEstadoEntityOu  } from "../../../../../domain/index.js";
import { MatriculaEstadoMapper } from "../../mappers/matricula.estado.mapper.js";

import { PostgresConnection } from "../../../../database/postgres/index.js";

export class MatriculaEstadoDatasourceImpl implements MatriculaEstadoDatasource { 

    async findAll(): Promise<MatriculaEstadoEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_matricula_estado");
            if (result.rows.length>0) {
                // console.log(result.rows)
                return MatriculaEstadoMapper.findEntityFromObject({ 
                    ok: true, 
                    data: result.rows, 
                    message: 'Operación exitosa' 
                });
            }
            return MatriculaEstadoMapper.findEntityFromObject({ ok: false, message: 'Error' });
        } catch (error) {
            if (error instanceof CustomError) { throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllActive(): Promise<MatriculaEstadoEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_matricula_estado WHERE estado=true");
            if (result.rows.length>0) {
                // console.log(result.rows)
                return MatriculaEstadoMapper.findEntityFromObject({ 
                    ok: true, 
                    data: result.rows, 
                    message: 'Operación exitosa' 
                });
            }
            return MatriculaEstadoMapper.findEntityFromObject({ ok: false, message: 'Error' });
        } catch (error) {
            if (error instanceof CustomError) { throw error; }
            throw CustomError.internalServer();
        }
    }

    async findById(): Promise<MatriculaEstadoEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_matricula_estado");
            if (result.rows.length>0) {
                // console.log(result.rows)
                return MatriculaEstadoMapper.findEntityFromObject({ 
                    ok: true,
                    data: result.rows,
                    message: 'Operación exitosa'
                });
            }
            return MatriculaEstadoMapper.findEntityFromObject({ ok: false, message: 'Error' });
        } catch (error) {
            if (error instanceof CustomError) { throw error; }
            throw CustomError.internalServer();
        }
    }
}