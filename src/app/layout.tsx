'use client';

import localFont from 'next/font/local';
import './globals.css';
import { CustomProvider } from '_components/provider';
import React, { Suspense } from 'react';
import I18nProvider from '_store/src/locales/i18n.provider';
import AppMainEntry from '_app/app';
import LoaderWrapper from '_components/loaderWrapper/LoaderWrapper';
import { Spinner } from '@chakra-ui/react';

const poppins = localFont({
  src: [
    { path: './fonts/Poppins-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Poppins-Regular.woff', weight: '400', style: 'normal' },
    { path: './fonts/Poppins-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Poppins-Bold.woff', weight: '700', style: 'normal' },
    { path: './fonts/Poppins-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Poppins-SemiBold.woff', weight: '600', style: 'normal' },
    { path: './fonts/Poppins-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Poppins-Medium.woff', weight: '500', style: 'normal' },
    { path: './fonts/Poppins-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Poppins-Light.woff', weight: '300', style: 'normal' },
    { path: './fonts/Poppins-Thin.woff2', weight: '100', style: 'normal' },
    { path: './fonts/Poppins-Thin.woff', weight: '100', style: 'normal' },
    {
      path: './fonts/Poppins-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    { path: './fonts/Poppins-ExtraLight.woff', weight: '200', style: 'normal' },
  ],
  variable: '--font-poppins',
  weight: '400 700',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <title>BVG-SCHOOL</title>
        <meta name="description" content="BVG-SCHOOL" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${poppins.variable}`}>
        <CustomProvider>
          <I18nProvider>
            <Suspense>
              <AppMainEntry>
                <LoaderWrapper>{children}</LoaderWrapper>
              </AppMainEntry>
            </Suspense>
          </I18nProvider>
        </CustomProvider>
      </body>
    </html>
  );
}
