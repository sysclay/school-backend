export class FileEntity {
    constructor(
        public filename: string,
        public path: string,
        public mimetype: string,
        public size: number
    ) {}
}

export class FileEntityOu {
    constructor(
        public ok: boolean,
        public data: FileEntity | null | undefined,
        public message: string
    ) {}

    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}