import { SingInButton } from '@/components/button'
import type { AuthorisationText } from '@/types'
export const NoAccessMessage = ({
  translations,
}: {
  translations: AuthorisationText
}) => {
  return (
    <div className="flex flex-col items-center gap-3 p-10">
      <p>{translations.authorizationRequired}</p>
      <SingInButton title={translations.signInButtonTitle!} />
    </div>
  )
}
