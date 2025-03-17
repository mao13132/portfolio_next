import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const response = NextResponse.next();

  // Проверяем наличие UTM-меток
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  utmParams.forEach((param) => {
    const value = url.searchParams.get(param);
    if (value) {
      response.cookies.set(param, value, {
        path: '/', // Доступно на всех страницах
        maxAge: 60 * 60 * 24 * 30, // Храним 30 дней
      });
    }
  });

  return response;
}

// Применяем middleware ко всем страницам
export const config = {
  matcher: '/:path*',
};

