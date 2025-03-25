
import { CustomError, NotificacionDatasource, NotificacionEntityOu, RegisterNotificacionDto } from "../../../domain/index.js";
import { NotificacionMapper } from "../../mappers/notificacion.mapper.js";
//import { NotificacionModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";
import { QR } from "../../../config/index.js";

import { admin } from "../../../config/index.js";

export class NotificacionDatasourceImpl implements NotificacionDatasource { 

    async register(registerNotificacionDto: RegisterNotificacionDto): Promise<NotificacionEntityOu>{
        const { token_fcm,message, apoderado_id} = registerNotificacionDto;
        const pool = PostgresDatabase.getPool();
        try {

            const query = `SELECT * FROM tbl_fcm where estado = true and token_fcm=$1`;
            const values = [token_fcm];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result){
                if(result.rowCount===0){
                    return NotificacionMapper.findEntityFromObject({ok:false, data:result.rows,message:'No encontrado'})
                }

                const noti_message = {
                    token:token_fcm,
                    notification: {
                    title: "🚀 Notificación School",
                    body: message?message:"Este es un mensaje enviado desde Node.js con TypeScript",
                    },
                    data: { // 🔹 Datos adicionales
                        customData: "valor",
                        anotherParam: "otro valor"
                    },
                    android: {
                        priority: "high" as const,
                        notification: {
                        sound: "default",
                        channelId: "default-channel-id", // 🔹 Asegúrate de crear este canal en Android
                        }
                    }
                };

                const response = await admin.messaging().send(noti_message);

                console.log("✅ Notificación enviada con éxito:", response);
                return NotificacionMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'});

            }
            return NotificacionMapper.findEntityFromObject({ok:false,message:'Error'})

            // return NotificacionMapper.NotificacionEntityFromObject({ok:false,message:response});


        } catch (error:any) {
            await pool.query('ROLLBACK');
            console.log(error)
            if (error.code === '23505') {
                return NotificacionMapper.NotificacionEntityFromObject({ok:false,message:'El numero documento ya existe'});
                // throw CustomError.badRequest(`El numero documento ya existe`);
            }
            if (error.code === '23503') {
                throw CustomError.badRequest(`El tipo documento no existe`);
            }

            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}