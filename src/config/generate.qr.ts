import QRCode  from 'qrcode'

export class QR {

    static async generate(texto: string):Promise<string>{
        try {
            const qrDataUrl = await QRCode.toDataURL(texto);
            return qrDataUrl; // Retorna la imagen QR en formato base64
        } catch (error) {
            console.error('Error al generar QR:', error);
            throw error;
        }
    }
}
