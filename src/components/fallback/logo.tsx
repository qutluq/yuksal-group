import Image from 'next/image'

export const LoadingLogo = () => (
  <div className="h-screen w-screen overflow-hidden">
    <div className="flex flex-row items-center justify-center"></div>
    <div className="flex h-screen w-screen animate-[scaling_7s_infinite] items-center justify-center ease-linear">
      <Image
        src={`/assets/preloader_logo.svg`}
        height={300}
        width={312}
        alt="Logo"
      />
    </div>
  </div>
)
