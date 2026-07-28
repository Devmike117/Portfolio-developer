import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Excluye:
     * - /_next/static (archivos estáticos)
     * - /_next/image (optimización de imágenes)
     * - /favicon.ico, /robots.txt, /sitemap.xml
     * - archivos con extensión (imágenes, fuentes, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js|woff2?)$).*)',
  ],
};

export default function middleware(request) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    const lowerUA = userAgent.toLowerCase();
    const path = request.nextUrl.pathname;

    // Permitir bots buenos
    const allowedSocialBots = [
      'vercel',
      'facebookexternalhit',
      'facebot',
      'instagram',
      'meta',
      'meta-inspector',
      'whatsapp',
      'twitterbot',
      'linkedinbot',
      'slackbot',
      'discordbot',
      'telegrambot',
      'pinterest',
      'skypeuripreview',
      'applebot',
    ];

    if (allowedSocialBots.some((bot) => lowerUA.includes(bot))) {
      return NextResponse.next();
    }

    // Bloquear rutas de WordPress / CMS
    const blockedPaths = [
      '/wp-admin', '/wp-login.php', '/wp-content', '/wp-includes',
      '/xmlrpc.php', '/administrator', '/user/login', '/cms', '/drupal',
    ];

    if (blockedPaths.some((p) => path.startsWith(p))) {
      return new Response('Access denied - Suspicious path', {
        status: 403,
        headers: { 'X-Blocked-Reason': 'Blocked CMS path' },
      });
    }

    // Bloquear user agents que parecen URLs
    if (lowerUA.startsWith('http://') || lowerUA.startsWith('https://')) {
      return new Response('Access denied - Malformed UA', {
        status: 403,
        headers: { 'X-Blocked-Reason': 'Malformed UA' },
      });
    }

    // Bloquear bots conocidos
    const blockedAgents = [
      'scrape', 'scraper', 'curl', 'wget', 'python-requests', 'http.client',
      'axios', 'node-fetch', 'go-http-client', 'java/', 'okhttp', 'apache-httpclient',
      'selenium', 'puppeteer', 'playwright', 'scrapy', 'gptbot', 'chatgpt', 'claudebot',
      'claude-web', 'anthropic', 'google-extended', 'perplexitybot', 'ccbot', 'omgilibot',
    ];

    if (blockedAgents.some((bot) => lowerUA.includes(bot))) {
      return new Response('Access denied - Bot detected', {
        status: 403,
        headers: { 'X-Blocked-Reason': 'Bot UA' },
      });
    }

    // Bloquear navegadores falsos (Chrome)
    const chromeMatch = userAgent.match(/Chrome\/(\d+)\./);
    if (chromeMatch) {
      const chromeVersion = parseInt(chromeMatch[1], 10);
      if (chromeVersion < 100 || chromeVersion > 150) {
        return new Response('Access denied - Fake Chrome version', {
          status: 403,
          headers: { 'X-Blocked-Reason': 'Fake browser version' },
        });
      }
    }

    if (userAgent.includes('Edge/18.') || userAgent.includes('Edge/17.')) {
      return new Response('Access denied - Old Edge version', {
        status: 403,
        headers: { 'X-Blocked-Reason': 'Suspicious Edge version' },
      });
    }

    // Bloquear UAs inválidos sin bloquear bots buenos
    if (userAgent.length < 5 || lowerUA === '' || lowerUA === 'null' || lowerUA === 'undefined') {
      return new Response('Access denied - Invalid UA', {
        status: 403,
        headers: { 'X-Blocked-Reason': 'Invalid user agent' },
      });
    }

    // Reglas móviles
    if (lowerUA.includes('android') && !lowerUA.includes('mobile')) {
      return new Response('Access denied - Suspicious Android', {
        status: 403,
        headers: { 'X-Blocked-Reason': 'Fake Android UA' },
      });
    }

    if (userAgent.includes('Build/') && !lowerUA.includes('mobile safari')) {
      return new Response('Access denied - Fake mobile', {
        status: 403,
        headers: { 'X-Blocked-Reason': 'Suspicious build string' },
      });
    }

    return NextResponse.next();
  } catch (err) {
    // Nunca dejar que el middleware crashee: si algo falla, deja pasar la petición
    console.error('Middleware error:', err);
    return NextResponse.next();
  }
}