import { Button } from '@/components/button'
import type { Post as PostType } from '@/types/blog'
import { classNames, translate } from '@/utils'
type PropTypes = {
  neighbours: { previousPost: PostType | null; nextPost: PostType | null }
  lang: string
}

export const PostNeighbours = ({ neighbours, lang }: PropTypes) => {
  return (
    <>
      <div
        className={classNames(
          'border-y',
          neighbours.previousPost === null
            ? 'border-y-gray-500'
            : 'border-y-white',
        )}
      >
        <Button
          href={neighbours.previousPost?.slug || '#'}
          disabled={neighbours.previousPost === null}
          variant="text"
        >
          <p className="flex w-full flex-row justify-center overflow-hidden truncate md:w-60">
            {neighbours.previousPost?.title || translate('Previous', lang)}
          </p>
        </Button>
      </div>
      <div
        className={classNames(
          'border-y',
          neighbours.nextPost === null ? 'border-y-gray-500' : 'border-y-white',
        )}
      >
        <Button
          href={neighbours.nextPost?.slug || '#'}
          disabled={neighbours.nextPost === null}
          variant="text"
        >
          <p className="flex w-full flex-row justify-center overflow-hidden truncate md:w-60">
            {neighbours.nextPost?.title || translate('Next', lang)}
          </p>
        </Button>
      </div>
    </>
  )
}
