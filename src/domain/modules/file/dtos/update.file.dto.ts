export class UpdateFileDto {
    private constructor(
        public filename: string,
        public newFilename?: string,
        public buffer?: Buffer
    ) {}

    static update(object: {[key: string]: any}): [string?, UpdateFileDto?] {
        const { filename, newFilename, buffer } = object;
        if (!filename) return ["Missing filename"];
        return [undefined, new UpdateFileDto(filename, newFilename, buffer)];
    }
}