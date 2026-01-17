// Middleware de Vercel para bloquear bots y tráfico no deseado
export const config = {
  matcher: '/:path*',
}

export default function middleware(request) {
    // Bloquear IP específica (COORDINADORA DE CARRIERS, S.A. DE C.V.)
    const blockedIPs = ['201.168.150.178'];
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (ip && blockedIPs.includes(ip)) {
      return new Response('Access denied - Blocked IP', {
        status: 403,
        headers: { 'X-Blocked-Reason': 'Blocked IP' }
      });
    }
  const userAgent = request.headers.get('user-agent') || '';
  const lowerUA = userAgent.toLowerCase();
  
  // 1. Bloquear bots conocidos por nombre
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

  if (blockedAgents.some(bot => lowerUA.includes(bot))) {
    return new Response('Access denied - Bot detected', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Bot UA' }
    });
  }

  // 2. Detectar versiones imposibles de Chrome (permitir 100-150)
  const chromeMatch = userAgent.match(/Chrome\/(\d+)\./);
  if (chromeMatch) {
    const chromeVersion = parseInt(chromeMatch[1]);
    // Solo bloquear versiones <100 o >150 (más permisivo)
    if (chromeVersion < 100 || chromeVersion > 150) {
      return new Response('Access denied - Fake Chrome version', {
        status: 403,
        headers: { 'X-Blocked-Reason': 'Fake browser version' }
      });
    }
  }

  // 3. Detectar Edge con versiones raras (Edge/18.19582)
  if (userAgent.includes('Edge/18.') || userAgent.includes('Edge/17.')) {
    return new Response('Access denied - Old Edge version', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Suspicious Edge version' }
    });
  }

  // 4. Bloquear User-Agents demasiado cortos o sin Mozilla
  if (userAgent.length < 20 || (!lowerUA.includes('mozilla') && !lowerUA.includes('compatible'))) {
    return new Response('Access denied - Invalid UA', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Invalid user agent' }
    });
  }

  // 5. Detectar patrones sospechosos: Android sin Chrome Mobile
  if (lowerUA.includes('android') && !lowerUA.includes('mobile')) {
    return new Response('Access denied - Suspicious Android', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Fake Android UA' }
    });
  }

  // 6. Bloquear si tiene Build/ pero no es móvil legítimo
  if (userAgent.includes('Build/') && !lowerUA.includes('mobile safari')) {
    return new Response('Access denied - Fake mobile', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Suspicious build string' }
    });
  }

  // Permitir tráfico legítimo
  return undefined;
}
