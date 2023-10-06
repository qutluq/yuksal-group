import type { SettingsInitialized } from '@/types'
import { translate } from '@/utils'

type PropTypes = {
  lang: string
  settings: SettingsInitialized
  setSettingValue: (value: string | number, field: string) => void
  setUnsavedChangesExist: (boolean) => void
}
export const SettingsList = ({
  lang,
  settings,
  setSettingValue,
  setUnsavedChangesExist,
}: PropTypes) => (
  <div className="flex w-[400px] flex-col gap-3 overflow-hidden rounded-lg bg-gray-700 pb-2 md:w-[700px]">
    <span className="bg-gray-500 pl-2 text-lg">{translate('Lists', lang)}</span>

    <div className="flex flex-row gap-3 px-2">
      <label className="w-auto" htmlFor="paginationLimit">{`${translate(
        'Items per page, e.g. posts per page on blog page',
        lang,
      )}: `}</label>
      <input
        id="paginationLimit"
        value={settings.paginationLimit || ''}
        onChange={(e) => {
          setSettingValue(e.target.value, 'paginationLimit')
          setUnsavedChangesExist(true)
        }}
        className="w-16 rounded-sm bg-white pl-2 text-black"
        type="number"
        placeholder="100"
      />
    </div>
  </div>
)
