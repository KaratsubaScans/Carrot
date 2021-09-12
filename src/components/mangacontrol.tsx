import React, { Component } from 'react';

import { ReaderSettings } from 'types/reader.types';
import 'components/mangacontrol.css';

type Props = {
  readerSettings: ReaderSettings
}

const MangaControl = (props: Props) => {
  return (
    <div className="mangacontrol-body">
      <p>manga control</p>
    </div>
  );
}

export default MangaControl;
