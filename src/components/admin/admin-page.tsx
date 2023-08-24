import { SingOutButton } from '@/components/button/sign-out-button'
import type { AuthorisationText } from '@/types'

export const AdminPage = ({
  translations,
}: {
  translations: AuthorisationText
}) => {
  return (
    <div className="flex flex-col items-center gap-3 p-10">
      <p>Secured admin page</p>
      <SingOutButton title={translations.signOutButtonTitle!} />
    </div>
  )
}
