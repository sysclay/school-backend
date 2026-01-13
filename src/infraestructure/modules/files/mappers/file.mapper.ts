
import { FileEntity, FileEntityOu } from "../../../../domain/index.js";

export class FileMapper {
    static FileEntityFromObject(object: { [key: string]: any }) {
        const { ok, data, message } = object;
        let _data = null;
        if (data) {
            _data = new FileEntity(
                data.filename,
                data.path,
                data.mimetype,
                data.size
            );
        }
        return new FileEntityOu(ok, _data, message);
    }
}