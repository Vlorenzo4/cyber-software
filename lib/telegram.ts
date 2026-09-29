export async function enviarTelegram(mensaje: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn(
      "TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID no configurados: se omitió la notificación."
    );
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: mensaje,
      }),
    });
  } catch (error) {
    console.error("Error enviando notificación de Telegram:", error);
  }
}
