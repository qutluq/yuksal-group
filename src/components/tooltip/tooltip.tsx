type PropTypes = {
  children: React.ReactNode
  text: string
}

export const Tooltip = ({ children, text }: PropTypes) => {
  return (
    <>
      <div
        className={
          'absolute top-[-10] z-10 h-full w-full opacity-0 hover:bg-black/70 hover:opacity-100'
        }
      >
        {text}
      </div>
      {children}
    </>
  )
}
