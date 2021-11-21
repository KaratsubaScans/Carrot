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
  const [settings, setSettings] = useState(keyBindings);

  return (
    <div>
      <div className="flex flex-row space-x-4">
        <h1 className="flex-grow">Previous Page:</h1>
        <h1>{settings.previousPage}</h1>
      </div>
      <div className="flex flex-row space-x-4">
        <h1 className="flex-grow">Next Page:</h1>
        <h1>{settings.nextPage}</h1>
      </div>
      <div className="flex flex-row space-x-4">
        <h1 className="flex-grow">Previous Chapter:</h1>
        <h1>{settings.previousChapter}</h1>
      </div>
      <div className="flex flex-row space-x-4">
        <h1 className="flex-grow">Next Chapter:</h1>
        <h1>{settings.nextChapter}</h1>
      </div>
    </div>
  )
}

export default HotKeys;