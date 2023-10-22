import Image from 'next/image'

import { SanitizedHTML } from '@/components/html'

type AboutMain = {
  ttle: string
  content: string
  image: string
}
const aboutMain: AboutMain = {
  ttle: 'Group origins',
  content: `Officia tempore eaque. Molestiae culpa aspernatur. Inventore facere vitae. Sint accusamus ut blanditiis. Hic laudantium laboriosam fuga aliquid saepe nihil commodi. Tenetur quasi modi sed commodi mollitia consectetur quo natus neque. Similique enim omnis accusantium eius repellat cum at occaecati. Deserunt eaque veniam exercitationem cumque. Eos culpa officiis similique quo. Exercitationem commodi nostrum enim reprehenderit quam natus iure non. Incidunt eaque rerum voluptatem. Possimus consequatur nam minus temporibus cum nulla architecto animi fugiat. Doloremque eaque at ex qui dolor. Impedit blanditiis accusamus voluptas deserunt modi optio inventore eius quibusdam. Placeat impedit illum eaque enim atque voluptas dignissimos. Minus rerum ducimus officiis quam quas nulla illum ut esse.
  Magnam cumque ea ea. Perferendis error nobis odio harum rem blanditiis tenetur. Quod aut consectetur asperiores. Quisquam magnam ipsam numquam. Et molestias voluptates. Odit excepturi id rem laborum asperiores officia necessitatibus. Praesentium tempore perferendis nihil possimus. Beatae minima molestiae quo vel. Repellat accusantium repellat qui aliquam alias hic perferendis molestias. Labore consequatur dolor. Velit reiciendis iure. Consectetur culpa amet aperiam.


  Quod odit tempore esse vel. Possimus corporis culpa sed ut sequi dolore. Expedita rem fuga debitis adipisci velit vero ipsam suscipit. Voluptates quae illo possimus. Aliquid voluptatem vero. Libero repudiandae debitis magnam quaerat non ut praesentium quibusdam quaerat. Distinctio voluptatum ducimus. Praesentium sapiente assumenda doloribus nam iste est. Repellat expedita rem autem voluptates cum eius. Non voluptatem ex labore maxime dolore nostrum odit quos. Assumenda id sunt. Odit cum commodi est quos nam. Accusantium quidem voluptas ut esse nemo nobis. Perspiciatis molestias ducimus perspiciatis aut a in.
  Est quia eveniet placeat. Labore quis deleniti ex pariatur natus consequuntur. Porro quae ratione sed. Porro vero repellendus ipsum iure earum quod nobis inventore. Delectus tempora maiores nulla dolores iste assumenda. Tempore quidem temporibus blanditiis voluptates soluta consectetur.`,
  image: '/assets/default-author-img.png',
}
export const About = () => {
  return (
    <div className="flex flex-row pt-8 sm:pt-12 lg:pt-16">
      <div className="relative flex w-full flex-col items-center justify-center text-[var(--color-text-primary)]">
        <div className=" w-full px-10 text-justify text-base sm:w-[600px] sm:px-0 lg:w-[900px] xl:w-[1200px] ">
          <div className="flex w-full flex-col items-center justify-center overflow-hidden lg:float-left lg:w-[400px] lg:items-start xl:w-[600px]">
            <div className="relative flex w-full flex-col items-center justify-center pb-10 lg:items-start">
              <span className="text-7xl font-bold text-white/10 sm:text-9xl">
                GROUP
              </span>
              <span className="absolute pl-3 text-4xl sm:text-6xl">YUKSAL</span>
            </div>

            <div className="flex flex-row items-center gap-3 pb-10 lg:mx-0">
              <div className="h-1 w-20 bg-[var(--color-primary)]" />
              <div className="text-center text-lg uppercase sm:text-2xl">
                {aboutMain.ttle}
              </div>
              <div className="h-1 w-20 bg-[var(--color-primary)] lg:hidden" />
            </div>
          </div>

          {aboutMain.image && (
            <div className="flex w-full flex-row items-center justify-center lg:float-right lg:w-[500px] xl:w-[600px]">
              <div className="relative top-0 mb-5 h-[300px] w-[300px] overflow-hidden rounded-md sm:h-[460px] sm:w-[460px] lg:ml-5 xl:h-[580px] xl:w-[580px]">
                <Image
                  src={aboutMain.image}
                  alt=""
                  className="object-cover"
                  fill
                />
              </div>
            </div>
          )}
          <div
            className="whitespace-pre-wrap text-base text-[var(--color-text-primary)]"
            id="content"
          >
            <SanitizedHTML html={aboutMain.content} />
          </div>
        </div>
      </div>
    </div>
  )
}
