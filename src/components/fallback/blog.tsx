import { LoadingPost } from './post'

export const LoadingBlog = () => (
  <div className="flex flex-col items-center gap-3">
    <LoadingPost />
    <LoadingPost />
    <LoadingPost />
  </div>
)
