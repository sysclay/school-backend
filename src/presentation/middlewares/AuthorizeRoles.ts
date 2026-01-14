import { Request, Response, NextFunction } from 'express';
import { PostgresConnection } from '../../infraestructure/index.js';

interface AuthRequest extends Request {
  payload?: {
    id_usuario: string,
    username: string,
    rol?: {
        id_rol: number,
        rol_nombre: string
    },
    colegio?: {
        id_colegio: string,
        nombre_institucion: string
    }
  };
}

export const authorizeRoles = (...requiredRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const pool = PostgresConnection.getPool();
        const query = `SELECT seleccionar_permiso_usuario(p_id_rol:=$1,p_permiso:=$2,p_modulo:=$3) as response`;
        const values = [req.payload?.rol?.id_rol,requiredRoles[0],requiredRoles[1]];

        await pool.query('BEGIN'); 
        const result = await pool.query(query, values); 
        await pool.query('COMMIT'); 

        if (!result.rows[0].response.ok) {
          if(result.rows[0].response.message==='Sin acceso'){
            res.status(403).json({ message: 'Acceso denegado' });
            return;            
          }

        }else {
          if(result.rows[0].response.message==='Validación de permiso'){
            next();
          }          
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor al verificar roles' });
        return;
    }
  };
};