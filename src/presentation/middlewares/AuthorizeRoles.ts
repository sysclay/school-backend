import { Request, Response, NextFunction } from 'express';
import { PostgresDatabase } from "../../data/postgres/index.js";

interface AuthRequest extends Request {
    user?: {
      id: number;
      nro_documento:string,
      // cualquier otro campo de tu token
    };
  }

export const authorizeRoles = (...requiredRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const pool = PostgresDatabase.getPool();
        const query = `SELECT * FROM obtener_roles_por_usuario($1)`;
        const values = [req.user?.id];

        await pool.query('BEGIN'); 
        const result = await pool.query(query, values); 
        await pool.query('COMMIT'); 

        // const roles = result.rows.length==0?[]:result.rows.map((r)=> { return { id:r.rol_id, rol:r.rol }});
        const roles = result.rows.length==0?[]:result.rows.map((r)=> r.rol );
        const hasAccess = roles.some((role: string) => requiredRoles.includes(role));

        if (!hasAccess) {
            res.status(403).json({ message: 'Acceso denegado' });
            return;
        }
        next();
    
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor al verificar roles' });
        return;
    }
  };
};