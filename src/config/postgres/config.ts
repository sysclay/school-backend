import 'dotenv/config'
import env from "env-var";

export const envspg = {

    POSTGRES_HOST:env.get('POSTGRES_HOST').required().asString(),
    POSTGRES_PORT:env.get('POSTGRES_PORT').required().asInt(),
    POSTGRES_DATABASE:env.get('POSTGRES_DATABASE').required().asString(),
    POSTGRES_USER:env.get('POSTGRES_USER').required().asString(),
    POSTGRES_PASSWORD:env.get('POSTGRES_PASSWORD').required().asString(),
    POSTGRES_SSL: env.get("POSTGRES_SSL").default("true").asBool(),

    POSTGRES_CONNECTION_STRING:env.get('POSTGRES_CONNECTION_STRING').required().asString(),

    PORT: env.get('PORT').required().asIntPositive(),
    SECRET_JWT: env.get('SECRET_JWT').required().asString(),
}