import React, { Component, useState } from 'react';

import { ReaderSettings, ReaderMode, ImageSizing, ColourTheme } from 'types/reader.types';
import 'components/MangaControl.css';
import titleIcon from 'assets/menu/title.svg'
import bookmarkIcon from 'assets/menu/bookmark.svg'
import bookOpenIcon from 'assets/menu/book-open.svg'
import checkmarkIcon from 'assets/menu/checkmark.svg'
import colorSwatchIcon from 'assets/menu/color-swatch.svg'
import photographIcon from 'assets/menu/photograph.svg'
import leftArrowIcon from 'assets/menu/left-arrow.svg'
import rightArrowIcon from 'assets/menu/right-arrow.svg'
import downloadIcon from 'assets/menu/download.svg'
import shareIcon from 'assets/menu/share.svg'
import rssIcon from 'assets/menu/rss.svg'

type Props = {
  readerSettings: ReaderSettings,
  updateReaderSettings: (newReaderSettings: ReaderSettings) => void
}

const MangaControl = (props: Props) => {
  const [menu, setMenu] = useState(true)
  return (
    <div className="menuWrapper no-scrollbar pr-12">
      <div className={menu ? "menu" : "menu menu-closed"}>
        <div className="absolute inset-y-0 right-0 flex justify-center items-center mr-2">
          <button onClick={() => {setMenu(!menu)}} className="bg-gray-100 p-2 shadow-lg rounded">
            <img src={menu ? leftArrowIcon : rightArrowIcon} alt="Expand/Collapse Menu" />
          </button>

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
          <select className="subtitle p-2">
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
          <select className="subtitle p-2">
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
          <select className="subtitle p-2">
            {Object.values(ImageSizing).map((item: string) =>
              (<option className="subtitle" value={item} key={item}>{item}</option>) 
            )}    
          </select>
        </div>
  
        <div className="control">
          <div className="control-title">
            <img src={colorSwatchIcon} alt="Color Icon" />
            <div className="title">Colour Theme</div>
          </div>
          <div className="control-title">
            <input type="color" value="#ff0000" />
            <select className="subtitle p-2 w-full">
              {Object.values(ColourTheme).map((item: string) =>
                (<option className="subtitle" value={item} key={item}>{item}</option>) 
              )}    
            </select>
          </div>

        </div>
        <div>
          <button className="bg-gray-700 text-white rounded py-2 px-4">
            HotKeys
          </button>
        </div>
        <div className="regular">
          <input type="checkbox" id="autoLoad" />
          <label htmlFor="autoLoad" className="px-2">Autoload next page</label>
        </div>
        <div className="control-title">
          <button>
            <img src={shareIcon} alt="Share" />
          </button>
          <button>
            <img src={rssIcon} alt="RSS" />
          </button>
          <button>
            <img src={downloadIcon} alt="Download" />
          </button>
        </div>
    </div>
  </div>
  );
}

export default MangaControl;
