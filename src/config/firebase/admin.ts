
import admin from "firebase-admin";
import { envsfirebase } from "./config.js";

const FirebaseSDK = {
    type:envsfirebase.FIREBASE_type,
    project_id:envsfirebase.FIREBASE_project_id,
    private_key_id:envsfirebase.FIREBASE_private_key_id,
    private_key:envsfirebase.FIREBASE_private_key,
    client_email:envsfirebase.FIREBASE_client_email,
    client_id:envsfirebase.FIREBASE_client_id,
    auth_uri:envsfirebase.FIREBASE_auth_uri,
    token_uri:envsfirebase.FIREBASE_token_uri,
    auth_provider_x509_cert_url:envsfirebase.FIREBASE_auth_provider_x509_cert_url,
    client_x509_cert_url:envsfirebase.FIREBASE_client_x509_cert_url,
    universe_domain:envsfirebase.FIREBASE_universe_domain,
}

if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(FirebaseSDK as admin.ServiceAccount) });
}

export default admin;


  