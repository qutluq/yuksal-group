import type { SettingsInitialized } from '@/types'
import { translate } from '@/utils'

type PropTypes = {
  lang: string
  settings: SettingsInitialized
  setSettingValue: (value: string | number, field: string) => void
  setUnsavedChangesExist: (boolean) => void
}
export const SettingsMetadata = ({
  lang,
  settings,
  setSettingValue,
  setUnsavedChangesExist,
}: PropTypes) => (
  <div className="flex w-[400px] flex-col gap-3 overflow-hidden rounded-lg bg-gray-700 pb-2 md:w-[700px]">
    <span className="bg-gray-500 pl-2 text-lg">
      {translate('Metadata', lang)}
    </span>

    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 px-2 md:flex-row">
        <label className="w-72" htmlFor="siteName">{`${translate(
          'Site name',
          lang,
        )}: `}</label>
        <input
          id="siteName"
          value={settings.siteName || ''}
          onChange={(e) => {
            setSettingValue(e.target.value, 'siteName')
            setUnsavedChangesExist(true)
          }}
          className="w-96 rounded-sm bg-white pl-2 text-black"
          type="text"
          placeholder="Awesome website"
        />
      </div>

      <div className="flex flex-col gap-2 px-2 md:flex-row">
        <label className="w-72" htmlFor="siteDescription">{`${translate(
          'Site description',
          lang,
        )}: `}</label>
        <input
          id="siteDescription"
          value={settings.siteDescription || ''}
          onChange={(e) => {
            setSettingValue(e.target.value, 'siteDescription')
            setUnsavedChangesExist(true)
          }}
          className="w-96 rounded-sm bg-white pl-2 text-black"
          type="text"
          placeholder="Uyghur ethnic drums and pipes"
        />
      </div>

      <div className="flex flex-col gap-2 px-2 md:flex-row">
        <label className="w-72" htmlFor="siteUrl">{`${translate(
          'Site URL',
          lang,
        )}: `}</label>
        <input
          id="siteUrl"
          value={settings.siteUrl || ''}
          onChange={(e) => {
            setSettingValue(e.target.value, 'siteUrl')
            setUnsavedChangesExist(true)
          }}
          className="w-96 rounded-sm bg-white pl-2 text-black"
          type="text"
          placeholder="www.awesome-website.com"
        />
      </div>
    </div>
  </div>
)
