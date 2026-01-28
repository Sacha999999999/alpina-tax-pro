export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Méthode non autorisée');
    
    try {
        const response = await fetch('https://swisstaxcalculator.estv.admin.ch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                taxYear: req.body.taxYear,
                canton: req.body.canton,
                municipalityId: req.body.municipalityId,
                maritalStatus: req.body.maritalStatus,
                income: req.body.income,
                wealth: req.body.wealth || 0,
                numberOfChildren: req.body.numberOfChildren || 0
            })
        });

        if (!response.ok) throw new Error("Erreur AFC");

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur fédéral" });
    }
}
