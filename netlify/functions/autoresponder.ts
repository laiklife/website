type Payload = { email?: string; name?: string; lang?: string };

export const handler = async (event: any) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM = process.env.RESEND_FROM;

  if (!RESEND_API_KEY || !FROM) {
    return { statusCode: 500, body: "Missing RESEND env vars" };
  }

  let body: Payload = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {}

  const email = body.email;
  const name = body.name || "";
  const lang = body.lang || "fr";

  if (!email) return { statusCode: 400, body: "Missing email" };

  const subjects: Record<string, string> = {
    fr: "Merci pour ton message – Laiklife",
    en: "Thanks for your message – Laiklife",
    de: "Danke für deine Nachricht – Laiklife",
  };

  const lines: Record<string, string> = {
    fr: `Bonjour ${name}\n\nMerci pour ton message. Je te répondrai dès que possible.\n\n— Laiklife`,
    en: `Hi ${name}\n\nThanks for your message. I’ll get back to you as soon as possible.\n\n— Laiklife`,
    de: `Hi ${name}\n\nDanke für deine Nachricht. Ich melde mich so schnell wie möglich.\n\n— Laiklife`,
  };

  const payload = {
    from: FROM,
    to: email,
    subject: subjects[lang] ?? subjects.fr,
    text: lines[lang] ?? lines.fr,
  };

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!r.ok) {
    const err = await r.text().catch(() => "");
    return { statusCode: 500, body: `Resend error: ${err}` };
  }

  return { statusCode: 200, body: "OK" };
};