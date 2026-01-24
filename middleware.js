
// Bloqueo de rango de IPs maliciosas (ejemplo: 185.177.72.0/24)
function isBlockedIP(ip) {
  // Solo IPv4, rango 185.177.72.0 - 185.177.72.255
  if (typeof ip !== 'string') return false;
  return ip.startsWith('185.177.72.');
}

export function middleware(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.ip ||
    request.connection?.remoteAddress ||
    '';

  if (isBlockedIP(ip)) {
    return new Response('Forbidden', { status: 403 });
  }
  // ...existing code...
}
{/* Configuracion de middleware para bloquear bots y scrapers */}
export const config = {
  matcher: '/:path*',
}

{/* Lógica del middleware: (aceptar bot vercel) */}
export default function middleware(request) {
    const userAgent = request.headers.get('user-agent') || '';
    const lowerUA = userAgent.toLowerCase();
    if (lowerUA.includes('vercel')) {
      return undefined;
    }
  
  {/* Reglas para bloquear bots y scrapers */}
  const blockedAgents = [
    'bot', 'crawler', 'spider', 'scrape', 'scraper',
    'curl', 'wget', 'python-requests', 'http.client',
    'axios', 'node-fetch', 'go-http-client', 'java/',
    'okhttp', 'apache-httpclient', 'selenium', 'puppeteer',
    'playwright', 'scrapy', 'gptbot', 'chatgpt', 'claudebot',
    'claude-web', 'anthropic', 'bingbot', 'google-extended',
    'perplexitybot', 'applebot', 'facebookbot', 
    'facebookexternalhit', 'semrush', 'ahrefs', 'majestic',
    'mj12bot', 'dotbot', 'petalbot', 'bytespider',
    'yandexbot', 'baiduspider', 'seznambot', 'ahrefsbot',
    'semrushbot', 'dataforseo', 'serpstatbot', 'linkdex'
  ];
  {/* Bloquear User-Agents conocidos de bots */}
  if (blockedAgents.some(bot => lowerUA.includes(bot))) {
    return new Response('Access denied - Bot detected', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Bot UA' }
    });
  }

  {/* Bloquear bots que ni al caso: no navegadores reales o versiones raras */}
  const chromeMatch = userAgent.match(/Chrome\/(\d+)\./);
  if (chromeMatch) {
    const chromeVersion = parseInt(chromeMatch[1]);
    {/* Detectar versiones de Chrome fuera del rango 100-150 */}
    if (chromeVersion < 100 || chromeVersion > 150) {
      return new Response('Access denied - Fake Chrome version', {
        status: 403,
        headers: { 'X-Blocked-Reason': 'Fake browser version' }
      });
    }
  }

  {/* Bloquear versiones de edge no reconocidas */}
  if (userAgent.includes('Edge/18.') || userAgent.includes('Edge/17.')) {
    return new Response('Access denied - Old Edge version', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Suspicious Edge version' }
    });
  }

  {/* Bloquear User-Agents demasiado cortos o sin patrones comunes */}
  if (userAgent.length < 20 || (!lowerUA.includes('mozilla') && !lowerUA.includes('compatible'))) {
    return new Response('Access denied - Invalid UA', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Invalid user agent' }
    });
  }

  {/* Reglas específicas para dispositivos móviles */}
  if (lowerUA.includes('android') && !lowerUA.includes('mobile')) {
    return new Response('Access denied - Suspicious Android', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Fake Android UA' }
    });
  }

  {/* Bloquear iOS con cadenas de build sospechosas */}
  if (userAgent.includes('Build/') && !lowerUA.includes('mobile safari')) {
    return new Response('Access denied - Fake mobile', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Suspicious build string' }
    });
  }

  {/*Permitir trafico a este punto si pasa todas las reglas */}
  return undefined;
}
