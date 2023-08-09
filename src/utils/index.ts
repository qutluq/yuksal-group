export const classNames = (...classes: (string | boolean)[]) =>
  classes.filter(Boolean).join(' ')

export const getPaginationText = (page, limit, total, short = false) =>
  short
    ? `${total > 0 ? (page - 1) * limit + 1 : 0}/${
        page * limit > total ? total : page * limit
      } of ${total} `
    : `Showing ${total > 0 ? (page - 1) * limit + 1 : 0} to ${
        page * limit > total ? total : page * limit
      } of ${total} `

export const formatDate = (date: Date | null) => {
  if (date === null) {
    return 'n/a'
  }

  type OptionsType = {
    year: 'numeric' | '2-digit' | undefined
    month: 'numeric' | '2-digit' | 'short' | undefined
    day: 'numeric' | '2-digit' | undefined
  }

  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  } as OptionsType

  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export const slugify = (str: string) =>
  String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
