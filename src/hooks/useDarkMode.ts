import React, { useEffect, useState } from 'react'
// React.Dispatch<React.SetStateAction<string>>
export default function useDarkMode(): [string, (theme: string) => void] {
  const [theme, setTheme] = useState(localStorage.getItem('carrotTheme') || 'light');
  const colorTheme = (theme === 'light') ? 'dark' : 'light'
  const themeSet = (theme: string) => {
    setTheme(theme)
    localStorage.setItem('carrotTheme', theme)
  }
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme);
    root.classList.add(theme)
  }, [theme, colorTheme])
  return [colorTheme, themeSet]
}