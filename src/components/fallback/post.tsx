import { BsClock } from 'react-icons/bs'

export const LoadingPost = () => (
  <div className="relative flex w-10/12 flex-col gap-3 overflow-hidden  rounded-xl p-2 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg md:w-[724px] md:flex-row md:gap-0 md:p-3 lg:w-[960px] lg:p-5">
    <div className="relative flex h-[220px] flex-row justify-center  overflow-hidden md:mx-2 md:w-[334px] lg:mx-4 lg:h-[300px] lg:w-[448px]">
      <div className="h-full w-full rounded-lg bg-white/30"> </div>
    </div>

    <div className="flex flex-col justify-between gap-3 px-2 md:h-[220px] md:w-[334px] md:gap-0 lg:h-[300px] lg:w-[448px] lg:gap-3 lg:px-4">
      <div className="flex h-10 flex-col justify-between gap-1 lg:flex-row lg:gap-0">
        <p className="h-full w-3/4 rounded-md bg-white/30 pl-3 lg:w-4/6 " />
        <p className="h-full w-1/2 rounded-md bg-white/30 pl-3 lg:w-1/5 " />
      </div>
      <p className="w-full overflow-hidden  rounded-md bg-white/30 md:h-[120px] lg:h-[200px] "></p>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center justify-center gap-2">
          <BsClock />
          <p className="h-full w-10 rounded-md bg-white/30 pt-1"> </p>
        </div>
        <p className="h-full w-16 rounded-md bg-white/30"> </p>
      </div>
    </div>
  </div>
)
