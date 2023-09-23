import '@/app/globals.css'

import type { Metadata } from 'next'
import { Suspense } from 'react'

import Loading from '@/app/(site)/loading'
import { NextAuthSessionProvider, SettingsProvider } from '@/provider'
import { SiteName } from '@/utils/settings'
export const metadata: Metadata = {
  title: {
    template: `%s | ${SiteName}`,
    default: `${SiteName}`, // a default is required when creating a template
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="flex flex-col gap-5 bg-[var(--color-secondary)]">
        <Suspense fallback={<Loading />}>
          <NextAuthSessionProvider>
            <SettingsProvider>{children}</SettingsProvider>
          </NextAuthSessionProvider>
        </Suspense>
      </body>
    </html>
  )
}
