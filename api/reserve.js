const admin = require('firebase-admin');

// Initialiser Firebase Admin avec les variables d'environnement
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            "type": "service_account",
            "project_id": process.env.FIREBASE_PROJECT_ID,
            "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
            "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            "client_email": process.env.FIREBASE_CLIENT_EMAIL,
            "client_id": process.env.FIREBASE_CLIENT_ID,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL.replace('@', '%40')}`
        }),
    });
}

const db = admin.firestore();

module.exports = async (req, res) => {
    const { date } = req.body;

    if (req.method === 'POST') {
        const reservationRef = db.collection('reservations').doc(date);
        const doc = await reservationRef.get();

        if (doc.exists) {
            return res.status(200).json({ success: false, message: 'Date déjà réservée' });
        } else {
            await reservationRef.set({ reserved: true });
            return res.status(200).json({ success: true });
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
};
