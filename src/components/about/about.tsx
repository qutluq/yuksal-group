'use client'
import { useEffect, useState } from 'react'

import { getAboutMainInitialized } from '@/utils/api-client'

import { AboutMain as AboutMainComponent } from './about-main'

import type { AboutMainInitialized } from '@/types'

type PropTypes = {
  lang: string
}

export const About = ({ lang }: PropTypes) => {
  const [aboutMain, setAboutMain] = useState<AboutMainInitialized>()

  useEffect(() => {
    Promise.all([getAboutMainInitialized(lang)]).then((responses) => {
      setAboutMain(responses[0])
    })
  }, [])

  if (!aboutMain) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center pt-8 sm:pt-12 lg:pt-16">
      <AboutMainComponent aboutMain={aboutMain} />
    </div>
  )
}
