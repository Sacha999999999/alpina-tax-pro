export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Méthode non autorisée');
    try {
        const response = await fetch('https://swisstaxcalculator.estv.admin.ch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
}
