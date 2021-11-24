import React, { useEffect, useState } from 'react'
import { StorageKey } from 'types/reader.types'
import colourThemes from 'assets/themes.json'
export default function useDarkMode(): [string, (theme: string) => void] {
  const [theme, setTheme] = useState(localStorage.getItem(StorageKey.carrotTheme) || 'Light');
  const themeSet = (theme: string) => {
    setTheme(theme)
    localStorage.setItem(StorageKey.carrotTheme, theme)
  }
  useEffect(() => {
    const applyTheme = localStorage.getItem(StorageKey.carrotTheme) || 'Light'
    setTheme(applyTheme)
    const colourThemesJSON: any = colourThemes;
    const colours = colourThemesJSON[applyTheme] || colourThemesJSON['Light']

    document.documentElement.style.setProperty(`--primaryColour`, colours.primaryText)
    document.documentElement.style.setProperty(`--secondaryColour`, colours.secondaryText)
    document.documentElement.style.setProperty(`--backgroundColour`, colours.background)
    document.documentElement.style.setProperty(`--panelBackgroundColour`, colours.panelBackground)
  }, [theme, themeSet])
  return [theme, themeSet]
}
