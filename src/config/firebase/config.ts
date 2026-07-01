import 'dotenv/config'
import env from "env-var";

export const envsfirebase = {

    FIREBASE_type: env.get('FIREBASE_type').required().asString(),
    FIREBASE_project_id: env.get('FIREBASE_project_id').required().asString(),
    FIREBASE_private_key_id: env.get('FIREBASE_private_key_id').required().asString(),
    FIREBASE_private_key: env.get('FIREBASE_private_key').required().asString().replace(/\\n/g, '\n'),
    FIREBASE_client_email: env.get('FIREBASE_client_email').required().asString(),
    FIREBASE_client_id: env.get('FIREBASE_client_id').required().asString(),
    FIREBASE_auth_uri: env.get('FIREBASE_auth_uri').required().asString(),
    FIREBASE_token_uri: env.get('FIREBASE_token_uri').required().asString(),
    FIREBASE_auth_provider_x509_cert_url: env.get('FIREBASE_auth_provider_x509_cert_url').required().asString(),
    FIREBASE_client_x509_cert_url: env.get('FIREBASE_client_x509_cert_url').required().asString(),
    FIREBASE_universe_domain: env.get('FIREBASE_universe_domain').required().asString(),

}