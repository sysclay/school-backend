import { Request, Response } from "express";
import { CustomError, NotificacionRepository, RegisterNotificacionDto } from "../../domain/index.js";

export class NotificacionController {
    constructor (
         private readonly notificacionRepository:NotificacionRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    enviarNotificacion= (req:Request, res:Response):any=>{
        const [error, registerNotificacionDto ] = RegisterNotificacionDto.create(req.body);
        
        if(error){ return res.status(400).json({error})};
        this.notificacionRepository.register(registerNotificacionDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };
}

// async function sendNotification() {
//     try {
//         // const token = "ciRwfSjqQrOzi7B_QyoTq2:APA91bHylmQcsgQFhPmrO6MgdwVtHjNGg5DZCOfoTDntKKp8felGLPB-JLQg1ZJvHyDGUmBKSPMAxoBwq0jE0TW67IzzrWFS-PTEz6or3rJxq5yiAH74v4k";
//         const token ="eMQiSXAeR3iOPghxg_ZG65:APA91bHWYoCFweynt3UVexH4TFAx-vwicWYLliWjtnD6SNr8JIC0SL5Mp85wNF9tRysa4XZqOxzKtBZ9YNyab4eb7w58jFQ5eke4W8CXU4HIg6Z9unW58m0"
//         // const token = 'dTrXWtyPQ_qm4UQ-5XuoyW:APA91bFk03xvkkNrlBEb_wfFaXwGnbK80AQO1P-MvAxDbOq7tJFsmTaZTmH-HHKiQRf4damVwLrUBK-NKXcVruXC0d3phnMOpC_MkZCv2JWhpUMiEvWgYeI'
//         console.log('HEEE')
//       const message = {
//         token,
//         notification: {
//           title: "🚀 Notificación de prueba",
//           body: "Este es un mensaje enviado desde Node.js con TypeScript",
//         },
//         data: { // 🔹 Datos adicionales
//             customData: "valor",
//             anotherParam: "otro valor"
//         },
//         android: {
//             priority: "high" as const,
//             notification: {
//               sound: "default",
//               channelId: "default-channel-id", // 🔹 Asegúrate de crear este canal en Android
//             }
//           }
//       };
//       console.log('HEEE 222')

  
//       const response = await admin.messaging().send(message);
//       console.log("✅ Notificación enviada con éxito:", response);
//       return res.json({data:'DATOS ::',response:response})
//     } catch (error) {
//       console.error("❌ Error al enviar notificación:", error);
//     //   return this.handleError(error,res);
//     }
// }
// sendNotification();