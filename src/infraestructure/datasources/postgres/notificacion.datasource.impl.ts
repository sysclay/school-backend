
import { CustomError, FilterAsistenciaNotiDto, NotificacionDatasource, NotificacionEntityOu, RegisterNotificacionDto } from "../../../domain/index.js";
import { NotificacionMapper } from "../../mappers/notificacion.mapper.js";
//import { NotificacionModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";
import { QR } from "../../../config/index.js";

import { admin } from "../../../config/index.js";

export class NotificacionDatasourceImpl implements NotificacionDatasource { 

    async register(registerNotificacionDto: RegisterNotificacionDto): Promise<NotificacionEntityOu>{
        const { token_fcm,message, title} = registerNotificacionDto;
        try {
            const noti_message = {
                token:token_fcm,
                notification: {
                    title: title,
                    body: message?message:"Este es un mensaje enviado desde el backend",
                },
                data: { // 🔹 Datos adicionales
                    userId: '123',
                    tipo: 'alerta',
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

            await admin.messaging().send(noti_message);

            return NotificacionMapper.findEntityFromObject({ok:true,message:'Operación exitosa'});

        } catch (error:any) {
            console.log('YAA:',error)
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

    async obtenerFcmApoderadoAlumno(filterAsistenciaNotiDto:FilterAsistenciaNotiDto): Promise<NotificacionEntityOu>{
       const {codigo, anio}= filterAsistenciaNotiDto;
        const pool = PostgresDatabase.getPool();
        try {

            const query = `SELECT 
            mat.id as id_matricula,
            per.nombre as nom_apoderado,
            per.apellido_paterno as pat_apoderado,
            per.apellido_materno as mat_apoderado,
            per.nro_documento as doc_apoderado,
            per.email as correo,
            ani.anio,
            fcm.device_id,
            fcm.token_fcm
            from tbl_alumno alu inner join tbl_matricula mat 
            on alu.id = mat.alumno_id inner join tbl_apoderado apo
            on apo.id = mat.apoderado_id inner join tbl_anio_lectivo ani
            on ani.id = mat.anio_lectivo_id inner join tbl_persona per
            on per.id = apo.persona_id inner join tbl_usuario usu
            on per.id = usu.persona_id inner join tbl_fcm fcm
            on usu.id = fcm.usuario_id
            where alu.codigo_id = $1 and ani.anio = $2 and fcm.authenticated=true`;

            const values = [codigo, anio];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');

            if(result){
                if(result.rowCount!==0){
                    return NotificacionMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
                }
                return NotificacionMapper.findEntityFromObject({ok:true,data:[], message:'Sin respuesta'})
            }

            return NotificacionMapper.findEntityFromObject({ok:false,message:'Sin respuesta'})

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }


}