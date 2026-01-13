export class CustomError extends Error {

    public readonly statusCode: number;
    public readonly errors?: any[];
    public readonly cause?: unknown;

    constructor(statusCode: number, message: string, errors?: any[], cause?: unknown ){ 
        super (message); 
        this.statusCode = statusCode;
        this.errors = errors;
        this.cause = cause;

        // Captura la traza de error sin incluir el constructor en la pila de llamadas
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message:string, errors?: any[]){
        return new CustomError(400, message, errors );
    }
    static unauthorized(message:string){
        return new CustomError(401, message);
    }

    static forbidden(message:string){
        return new CustomError(403, message);
    }
    static notFound(message:string){
        return new CustomError(404, message);
    }

    static internalServer(message:string=`Internal Server Error`, cause?: unknown){
        return new CustomError(500, message, undefined, cause);
    }

    // Método estático para manejar errores de Google
    static googleAuthError(message: string) {
        return new CustomError(400, `Google Auth Error: ${message}`);
    }

    // Permite convertir el error en JSON cuando se envía como respuesta
    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            errors: this.errors,
            cause: this.cause ? String(this.cause) : undefined
        };
    }
}