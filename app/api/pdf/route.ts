// app/api/pdf/route.ts
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium';

export async function GET() {
  let browser = null;

  try {
    if (process.env.NODE_ENV === 'development') {
      // Use local Puppeteer in development
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      });
    } else {
      // Use @sparticuz/chromium in production
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(), // Ensure this is correctly set
        headless: chromium.headless,
      });
    }

    const page = await browser.newPage();
    await page.goto('https://www.google.com', { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=google.pdf',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Failed to generate PDF', { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}