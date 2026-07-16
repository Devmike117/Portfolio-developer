export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Método no permitido" });
  }

  const RATE_LIMIT_WINDOW_MS = 60 * 1000;
  const RATE_LIMIT_MAX_REQUESTS = 5;

  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.connection?.remoteAddress || "unknown";
  const now = Date.now();
  let entry = ipRequestCounts.get(ip);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    entry = { count: 1, start: now };
    ipRequestCounts.set(ip, entry);
  } else {
    entry.count++;
    if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
      return res.status(429).json({ success: false, error: "Has excedido el límite de solicitudes. Intenta más tarde." });
    }
  }

  // Validar dominio de origen 
  const allowedHosts = ["www.devmike117.com", "devmike117.com"];
  const originHeader = req.headers["origin"] || req.headers["referer"] || "";
  let isAllowed = false;
  try {
    const hostname = new URL(originHeader).hostname;
    isAllowed = allowedHosts.includes(hostname);
  } catch {
    isAllowed = false;
  }
  if (!isAllowed) {
    return res.status(403).json({ success: false, error: "Forbidden: Invalid origin" });
  }

  // CORS
  res.setHeader("Access-Control-Allow-Origin", originHeader);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const data = req.body;
    if (!data || typeof data !== "object") {
      return res.status(400).json({ success: false, error: "Cuerpo de solicitud inválido" });
    }

   {/* Honeypot: campo oculto que un bot llenaría pero un humano no ve */}
    if (data.website) {

      return res.status(200).json({ success: true });
    }

    // Validación y sanitización de datos de entrada
    const sanitize = (str) => String(str || "").replace(/<[^>]*>?/gm, "").trim();
    const isValidEmail = (email) => /^[\w.-]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);

    const from_name = sanitize(data.from_name);
    const from_email = sanitize(data.from_email);
    const message = sanitize(data.message);

    if (!from_name || !from_email || !message) {
      return res.status(400).json({ success: false, error: "Faltan campos obligatorios" });
    }
    if (!isValidEmail(from_email)) {
      return res.status(400).json({ success: false, error: "Dirección de correo inválida" });
    }
    if (from_name.length > 50) {
      return res.status(400).json({ success: false, error: "Nombre demasiado largo" });
    }
    if (message.length > 1000) {
      return res.status(400).json({ success: false, error: "Mensaje demasiado largo" });
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        template_params: { from_name, from_email, message },
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error(`EmailJS API error: ${response.status} ${response.statusText} - ${text}`);
      return res.status(502).json({ success: false, error: "No se pudo enviar el mensaje. Intenta más tarde." });
    }

    return res.status(200).json({ success: true, result: text });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
}
const ipRequestCounts = new Map();