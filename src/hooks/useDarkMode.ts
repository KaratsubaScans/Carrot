import React, { useEffect, useState } from 'react'
import colourThemes from 'assets/themes.json'
export default function useDarkMode(): [string, (theme: string) => void] {
  const [theme, setTheme] = useState(localStorage.getItem('carrotTheme') || 'light');
  const themeSet = (theme: string) => {
    setTheme(theme)
    localStorage.setItem('carrotTheme', theme)
  }
  useEffect(() => {
    const applyTheme = localStorage.getItem('carrotTheme') || 'light'
    setTheme(applyTheme)
    console.log('setting the theme', applyTheme)
    const colourThemesJSON: any = colourThemes;
    const colours = colourThemesJSON[applyTheme]

    document.documentElement.style.setProperty(`--primaryColour`, colours.primaryText)
    document.documentElement.style.setProperty(`--secondaryColour`, colours.secondaryText)
    document.documentElement.style.setProperty(`--backgroundColour`, colours.background)
    document.documentElement.style.setProperty(`--panelBackgroundColour`, colours.panelBackground)
    /*
    const root = window.document.documentElement
    root.classList.remove(colorTheme);
    root.classList.add(theme)
    */
  }, [theme, themeSet])
  return [theme, themeSet]
}