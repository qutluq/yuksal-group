import { Button } from '@/components/button'

export const Footer = () => (
  <div className="flex w-full flex-col items-center justify-center bg-white/10 py-3 text-sm text-[var(--color-text-primary)] sm:flex-row md:text-lg">
    <p className="pt-1">Yuksal Group© 2023 \ All Rights Reserved \&nbsp;</p>
    <div className="flex flex-row">
      <p className="pt-1">Design by</p>
      <Button variant="text" href="https://github.com/qutluq">
        Qutluq
      </Button>
    </div>
  </div>
)
