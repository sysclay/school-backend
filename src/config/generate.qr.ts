import QRCode  from 'qrcode'
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";

interface valueQR {
    texto:string,
    filename:string
}
export class QR {

    static async generate({texto,filename}:valueQR):Promise<{ uri: string; filename: string; path: string }>{
        try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            // Carpeta donde se guardarán los QR
            const qrDir = path.resolve(__dirname, '../public/imagen/alumno');
            if (!fs.existsSync(qrDir)) {
                fs.mkdirSync(qrDir, { recursive: true });
            }

            // Nombre del archivo
            const file = filename 
                ? `${filename}.png`
                : `qr_${Date.now()}.png`;
            const filePath = path.join(qrDir, file);

            // Generar y guardar el QR como imagen
            await QRCode.toFile(filePath, texto);
            const uri = `/imagen/alumno/${file}`;


            // const qrDataUrl = await QRCode.toDataURL(texto);
            return {
                uri,        // para servirlo públicamente
                filename: file, // nombre del archivo
                path: filePath  // ruta absoluta en el servidor
            }; // Retorna la ruta del archivo generado
        } catch (error) {
            throw error;
        }
    }
}
