import React, { useState } from 'react';

const HotKeys: React.FunctionComponent = () => {

  const keyBindings = {
    previousPage: "J",
    nextPage: "K",
    previousChapter: "H",
    nextChapter: "L",
  }
  const keyBindingsLocal = localStorage.getItem('carrotKeyBindings')
  if (keyBindingsLocal) {
    try {
      const keyBindingsParsed = JSON.parse(keyBindingsLocal);
      if (keyBindingsParsed.previousPage) {
        keyBindings.previousPage = keyBindingsParsed.previousPage
      }
      if (keyBindingsParsed.previousPage) {
        keyBindings.previousPage = keyBindingsParsed.previousPage
      }
      if (keyBindingsParsed.previousPage) {
        keyBindings.previousPage = keyBindingsParsed.previousPage
      }
      if (keyBindingsParsed.previousPage) {
        keyBindings.previousPage = keyBindingsParsed.previousPage
      }
    } catch (err) {
      console.log('Key Binding settings not found.')
    }
  }
  const [nextPage, setNextPage] = useState()

  return (
    <div>

    </div>

  )
}

export default HotKeys;