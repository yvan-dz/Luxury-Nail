let reservations = [];

module.exports = (req, res) => {
    const { date } = req.body;

    if (req.method === 'POST') {
        // Vérifier si la date est déjà réservée
        const isReserved = reservations.includes(date);
        if (isReserved) {
            return res.status(200).json({ success: false, message: 'Date déjà réservée' });
        }

        // Ajouter la date à la liste des réservations
        reservations.push(date);
        return res.status(200).json({ success: true });
    }

    // Si la méthode n'est pas POST, renvoyer une erreur
    return res.status(405).json({ message: 'Method Not Allowed' });
};
