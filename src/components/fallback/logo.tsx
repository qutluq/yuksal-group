import Image from 'next/image'

export const LoadingLogo = () => (
  <div className="flex h-screen w-screen items-center justify-center opacity-50 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20">
    <Image
      src={`/assets/preloader_logo.svg`}
      height={300}
      width={312}
      alt="Logo"
    />
  </div>
)
