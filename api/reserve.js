// api/reserve.js

const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
