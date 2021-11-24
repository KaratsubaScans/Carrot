import { useEffect, useState } from 'react'
import { StorageKey } from 'types/reader.types'
import colourThemes, { ThemeSettings } from 'types/theme.types'

export default function useTheme(): [string, (theme: string) => void] {
  const [theme, setTheme] = useState(localStorage.getItem(StorageKey.carrotTheme) || 'Light');
  const themeSet = (theme: string) => {
    setTheme(theme)
    localStorage.setItem(StorageKey.carrotTheme, theme)
  }
  useEffect(() => {
    const applyTheme = localStorage.getItem(StorageKey.carrotTheme) || 'Light'
    setTheme(applyTheme)
    const colours: ThemeSettings = colourThemes[applyTheme] || colourThemes['Light']

    document.documentElement.style.setProperty(`--primaryColour`, colours.primaryText)
    document.documentElement.style.setProperty(`--secondaryColour`, colours.secondaryText)
    document.documentElement.style.setProperty(`--backgroundColour`, colours.background)
    document.documentElement.style.setProperty(`--panelBackgroundColour`, colours.panelBackground)
  }, [theme, themeSet])
  return [theme, themeSet]
}
