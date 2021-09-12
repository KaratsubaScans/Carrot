import React, { Component } from 'react';

import { ReaderSettings, ReaderMode, ImageSizing } from 'types/reader.types';
import 'components/MangaControl.css';

type Props = {
  readerSettings: ReaderSettings,
  updateReaderSettings: (newReaderSettings: ReaderSettings) => void
}

const MangaControl = (props: Props) => {
  return (
    <div className="mangacontrol-body">
      <p>manga control</p>
      <select>
        {Object.values(ReaderMode).map((readerMode: string) =>
          (<option value={readerMode} key={readerMode}>{readerMode}</option>) 
        )}    
      </select>
    </div>
  );
}

export default MangaControl;
