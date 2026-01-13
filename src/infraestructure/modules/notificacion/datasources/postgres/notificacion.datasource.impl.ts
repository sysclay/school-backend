
import { getMessaging } from "firebase-admin/messaging";
// const { getMessaging } = require("firebase-admin/messaging");
import { admin } from "../../../../../config/index.js";
import { CustomError, NotificacionDatasource, NotificacionEntityOu, RegisterNotificacionDto } from "../../../../../domain/index.js";
import { PostgresConnection } from "../../../../database/index.js";
import { NotificacionMapper } from "../../mappers/notificacion.mapper.js";

export class NotificacionDatasourceImpl implements NotificacionDatasource { 

    async register(registerNotificacionDto: RegisterNotificacionDto): Promise<NotificacionEntityOu>{
        const { token_fcm,message, title, hora} = registerNotificacionDto;
        const pool = PostgresConnection.getPool();
        try {

            await pool.query('BEGIN'); 
            const anio = ((new Date()).getFullYear()).toString();
            const queryS = `SELECT*FROM v_list_notificacion_apoderado WHERE id_alumno=$1 AND anio=$2 AND active=true`
            const result = await pool.query(queryS, [token_fcm,anio]);
            await pool.query('COMMIT');
            if(result.rowCount===0){
                return NotificacionMapper.findEntityFromObject({ok:false,message:'El alumno no tiene apoderados registrados'});
            }

            const messages = result.rows.map((item)=>({
                token:item.fcm,
                notification: {
                    title: title,
                    body: message?message:"Este es un mensaje enviado desde el backend",
                },
                data: { // 🔹 Datos adicionales
                    // userId: '123',
                    // tipo: 'alerta',
                    // customData: "valor",
                    // anotherParam: "otro valor",
                    alumno:item.alumno,
                    apoderado:item.apoderado,
                    pariente:item.pariente,
                    nivel:item.nivel,
                    grado:item.grado,
                    seccion:item.seccion,
                    hora:hora,
                },
                android: {
                    priority: "high" as const,
                    notification: {
                    sound: "default",
                    channelId: "default-channel-id", // 🔹 Asegúrate de crear este canal en Android
                    }
                }
            }));

            const message1 = await getMessaging().sendEach(messages);
            // console.log('okkkkkkkkkkkkkkk',message1)
            return NotificacionMapper.findEntityFromObject({ok:true,message:'Operación exitosa'});

        } catch (error:any) {
            const firebaseErrorCode = error?.errorInfo?.code || error?.code;
            if ( firebaseErrorCode === 'messaging/registration-token-not-registered' || firebaseErrorCode === 'messaging/invalid-argument') {
                throw CustomError.badRequest(`⚠️ Token FCM inválido o caducado: ${firebaseErrorCode}`);
            }
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}