export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM = process.env.RESEND_FROM;

  if (!RESEND_API_KEY || !FROM) {
    return new Response("Missing RESEND env vars", { status: 500 });
  }

  const body = await req.json().catch(() => null);
  // Erwartet: { email, name, lang }
  const email = body?.email;
  const name = body?.name || "";
  const lang = body?.lang || "fr";

  if (!email) return new Response("Missing email", { status: 400 });

  const subjects: Record<string, string> = {
    fr: "Merci pour ton message – Laiklife",
    en: "Thanks for your message – Laiklife",
    de: "Danke für deine Nachricht – Laiklife",
  };

  const lines: Record<string, string> = {
    fr: `Bonjour ${name || ""}\n\nMerci pour ton message. Je te répondrai dès que possible.\n\n— Laiklife`,
    en: `Hi ${name || ""}\n\nThanks for your message. I’ll get back to you as soon as possible.\n\n— Laiklife`,
    de: `Hi ${name || ""}\n\nDanke für deine Nachricht. Ich melde mich so schnell wie möglich.\n\n— Laiklife`,
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
    return new Response(`Resend error: ${err}`, { status: 500 });
  }

  return new Response("OK", { status: 200 });
};