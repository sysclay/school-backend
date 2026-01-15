
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";

interface valueFile {
    filename:string,
    base64:string
}
export class FOTO {

    static async newFoto({ filename, base64 }: valueFile): Promise<{ uri: string; filename: string; path: string }> {
        try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            const fotoDir = path.resolve(__dirname, '../public/imagen/persona');
            if (!fs.existsSync(fotoDir)) {
                fs.mkdirSync(fotoDir, { recursive: true });
            }

            const file = filename ? `${filename}.png` : `foto_${Date.now()}.png`;
            const filePath = path.join(fotoDir, file);

            // Guardar la imagen en disco
            const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
            fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

            const uri = `/imagen/persona/${file}`;

            return { uri, filename: file, path: filePath };
        } catch (error) {
            throw error;
        }
    }
}
