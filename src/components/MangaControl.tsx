import React, { Component, useState } from 'react';

import { ReaderSettings, ReaderMode, ImageSizing, ColourTheme } from 'types/reader.types';
import 'components/MangaControl.css';
import { TitleIcon, BookmarkIcon, BookOpenIcon, CheckMarkIcon, ColorSwatchIcon, PhotographIcon, LeftArrowIcon, RightArrowIcon, DownloadIcon, ShareIcon, RssIcon } from 'components/Icons'

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
          <button onClick={() => {setMenu(!menu)}} className="bg-gray-100 dark:bg-gray-700 p-2 shadow-lg rounded">
            { menu ? <LeftArrowIcon/> : <RightArrowIcon/> }
          </button>

        </div>
        <div>
          <TitleIcon className="float-left mr-2"/>
          <div className="heading">
            Shang-Chi and the Ten Rings <CheckMarkIcon className="inline-block"/>
          </div>
        </div>
        <div className="control">
          <div className="control-title">
            <BookmarkIcon/>
            <div className="title">Chapter</div>
          </div>
          <select className="subtitle dropdown">
            {Object.values(ReaderMode).map((readerMode: string) =>
              (<option className="subtitle" value={readerMode} key={readerMode}>{readerMode}</option>) 
            )}    
          </select>
        </div>
  
        <div className="control">
          <div className="control-title">
            <BookOpenIcon/> 
            <div className="title">Reading Mode</div>
          </div>
          <select className="subtitle dropdown">
            {Object.values(ReaderMode).map((readerMode: string) =>
              (<option className="subtitle" value={readerMode} key={readerMode}>{readerMode}</option>) 
            )}    
          </select>
        </div>
  
        <div className="control">
          <div className="control-title">
            <PhotographIcon/>
            <div className="title">Image Size</div>
          </div>
          <select className="subtitle dropdown">
            {Object.values(ImageSizing).map((item: string) =>
              (<option className="subtitle" value={item} key={item}>{item}</option>) 
            )}    
          </select>
        </div>
  
        <div className="control">
          <div className="control-title">
            <ColorSwatchIcon/>
            <div className="title">Colour Theme</div>
          </div>
          <div className="control-title">
            <input type="color" value="#ff0000" />
            <select className="subtitle dropdown w-full">
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
            <ShareIcon/>
          </button>
          <button>
            <RssIcon/>
          </button>
          <button>
            <DownloadIcon/>
          </button>
        </div>
    </div>
  </div>
  );
}

export default MangaControl;
