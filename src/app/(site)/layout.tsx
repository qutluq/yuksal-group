import '@/app/globals.css'

import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import I18nProvider from '@/providers/i18n-provider'
import ReduxProvider from '@/providers/redux-provider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = 'ru'
  return (
    <html lang={locale}>
      <body className="flex flex-col gap-5 bg-[var(--color-secondary)]">
        <ReduxProvider>
          <I18nProvider>
            {children}
            <Footer />
          </I18nProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
