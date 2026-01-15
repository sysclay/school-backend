import QRCode  from 'qrcode'
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";
export class QR {

    static async generate(texto: string, filename?:string):Promise<string>{
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

            // const qrDataUrl = await QRCode.toDataURL(texto);
            return filePath; // Retorna la ruta del archivo generado
        } catch (error) {
            console.error('Error al generar QR:', error);
            throw error;
        }
    }
}
