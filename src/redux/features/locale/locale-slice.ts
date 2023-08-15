// DUCKS pattern
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { defaultLocale } from '@/locales'

interface LocaleState {
  locale: string
}

const initialState: LocaleState = {
  locale: defaultLocale!,
}

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    localeChanged(state, action: PayloadAction<string>) {
      state.locale = action.payload
    },
  },
})

export const { localeChanged } = localeSlice.actions
export default localeSlice.reducer
