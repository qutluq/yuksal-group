import ModeProvider from '@/providers/mode-provider'

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return <ModeProvider mode={'admin'}>{children}</ModeProvider>
}
