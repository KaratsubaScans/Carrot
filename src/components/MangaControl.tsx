import React, { Component } from 'react';

import { ReaderSettings, ReaderMode, ImageSizing } from 'types/reader.types';
import 'components/MangaControl.css';
import titleIcon from 'assets/menu/title.svg'
import bookmarkIcon from 'assets/menu/bookmark.svg'
import bookOpenIcon from 'assets/menu/book-open.svg'
import checkmarkIcon from 'assets/menu/checkmark.svg'
import colorSwatchIcon from 'assets/menu/color-swatch.svg'
import photographIcon from 'assets/menu/photograph.svg'
import leftArrowIcon from 'assets/menu/left-arrow.svg'

type Props = {
  readerSettings: ReaderSettings,
  updateReaderSettings: (newReaderSettings: ReaderSettings) => void
}

const MangaControl = (props: Props) => {
  return (
    <div className="menu">
      <div className="absolute inset-y-0 right-0 flex justify-center items-center -mr-8">
        <img src={leftArrowIcon} alt="Expand/Collapse Menu" />

      </div>
      <div>
        <img className="float-left mr-2" src={titleIcon} alt="Title Icon" />
        <div className="heading">
          Shang-Chi and the Ten Rings <img className="inline-block" src={checkmarkIcon} alt="checkmark" />
        </div>
      </div>
      <div className="control">
        <div className="control-title">
          <img src={bookmarkIcon} alt="Bookmark Icon" />
          <div className="title">Chapter</div>
        </div>
        <select className="subtitle">
          {Object.values(ReaderMode).map((readerMode: string) =>
            (<option className="subtitle" value={readerMode} key={readerMode}>{readerMode}</option>) 
          )}    
        </select>
      </div>
 
      <div className="control">
        <div className="control-title">
          <img src={bookOpenIcon} alt="Reading Icon" />
          <div className="title">Reading Mode</div>
        </div>
        <select className="subtitle">
          {Object.values(ReaderMode).map((readerMode: string) =>
            (<option className="subtitle" value={readerMode} key={readerMode}>{readerMode}</option>) 
          )}    
        </select>
      </div>
 
      <div className="control">
        <div className="control-title">
          <img src={photographIcon} alt="Image Icon" />
          <div className="title">Image Size</div>
        </div>
        <select className="subtitle">
          {Object.values(ReaderMode).map((readerMode: string) =>
            (<option className="subtitle" value={readerMode} key={readerMode}>{readerMode}</option>) 
          )}    
        </select>
      </div>
 
      <div className="control">
        <div className="control-title">
          <img src={colorSwatchIcon} alt="Color Icon" />
          <div className="title">Colour Theme</div>
        </div>
        <select className="subtitle">
          {Object.values(ReaderMode).map((readerMode: string) =>
            (<option className="subtitle" value={readerMode} key={readerMode}>{readerMode}</option>) 
          )}    
        </select>
      </div>
      <div>
        <button className="bg-gray-700 text-white rounded py-2 px-4">
          HotKeys
        </button>
      </div>
      <div>
        Checkboxes
      </div>
      <div>
        Icons
      </div>
   </div>
  );
}

export default MangaControl;
