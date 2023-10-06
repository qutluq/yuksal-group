import type { SettingsInitialized } from '@/types'
import { translate } from '@/utils'

type PropTypes = {
  lang: string
  settings: SettingsInitialized
  setSettingValue: (value: string | number, field: string) => void
  setUnsavedChangesExist: (boolean) => void
}
export const SettingsSocial = ({
  lang,
  settings,
  setSettingValue,
  setUnsavedChangesExist,
}: PropTypes) => (
  <div className="flex w-[400px] flex-col gap-3 overflow-hidden rounded-lg bg-gray-700 pb-2 md:w-[700px]">
    <span className="bg-gray-500 pl-2 text-lg">
      {translate('Social network links', lang)}
    </span>

    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 px-2 md:flex-row">
        <label className="w-72" htmlFor="facebook">{`${translate(
          'Facebook',
          lang,
        )}: `}</label>
        <input
          id="facebook"
          value={settings.facebookLink || ''}
          onChange={(e) => {
            setSettingValue(e.target.value, 'facebookLink')
            setUnsavedChangesExist(true)
          }}
          className="w-96 rounded-sm bg-white pl-2 text-black"
          type="text"
          placeholder="www.facebook.com/yuksal.group"
        />
      </div>

      <div className="flex flex-col gap-2 px-2 md:flex-row">
        <label className="w-72" htmlFor="youtube">{`${translate(
          'Youtube',
          lang,
        )}: `}</label>
        <input
          id="youtube"
          value={settings.youtubeLink || ''}
          onChange={(e) => {
            setSettingValue(e.target.value, 'youtubeLink')
            setUnsavedChangesExist(true)
          }}
          className="w-96 rounded-sm bg-white pl-2 text-black"
          type="text"
          placeholder="www.youtube.com/yuksal.group"
        />
      </div>

      <div className="flex flex-col gap-2 px-2 md:flex-row">
        <label className="w-72" htmlFor="instagram">{`${translate(
          'Instagram',
          lang,
        )}: `}</label>
        <input
          id="instagram"
          value={settings.instagramLink || ''}
          onChange={(e) => {
            setSettingValue(e.target.value, 'instagramLink')
            setUnsavedChangesExist(true)
          }}
          className="w-96 rounded-sm bg-white pl-2 text-black"
          type="text"
          placeholder="www.instagram.com/yuksal.group"
        />
      </div>

      <div className="flex flex-col gap-2 px-2 md:flex-row">
        <label className="w-72" htmlFor="tiktok">{`${translate(
          'Tiktok',
          lang,
        )}: `}</label>
        <input
          id="tiktok"
          value={settings.tiktokLink || ''}
          onChange={(e) => {
            setSettingValue(e.target.value, 'tiktokLink')
            setUnsavedChangesExist(true)
          }}
          className="w-96 rounded-sm bg-white pl-2 text-black"
          type="text"
          placeholder="www.tiktok.com/yuksal.group"
        />
      </div>
    </div>
  </div>
)
