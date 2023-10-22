'use client'
import { useState } from 'react'

import { LoadingLogo } from '../fallback'
import { AboutMain as AboutMainComponent } from './about-main'

import type { AboutMainInitialized } from '@/types'
export const About = () => {
  const [aboutMain, setAboutMain] = useState<AboutMainInitialized>()

  if (!aboutMain) {
    return <LoadingLogo />
  }

  return (
    <div className="flex flex-col items-center justify-center pt-8 sm:pt-12 lg:pt-16">
      <AboutMainComponent aboutMain={aboutMain} />
    </div>
  )
}
