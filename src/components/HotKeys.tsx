import React, { useState } from 'react';
import { KeyBindings } from 'types/reader.types'

type Props = {
  settings: KeyBindings,
  setSettings: (newSettings: KeyBindings) => void
}

const HotKeys: React.FunctionComponent<Props> = (props: Props) => {
  const { settings } = props;

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