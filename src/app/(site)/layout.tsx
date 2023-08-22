import '@/app/globals.css'

import type { Metadata } from 'next'

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
  const locale = 'ru'
  return (
    <html lang={locale}>
      <body className="flex flex-col gap-5 bg-[var(--color-secondary)]">
        <>{children}</>
      </body>
    </html>
  )
}
