import React, { useState } from 'react';

import { ReaderSettings, ReaderMode, ImageSizing, ColourTheme, Chapter } from 'types/reader.types';
import 'components/MangaControl.css';
import { TitleIcon, BookmarkIcon, BookOpenIcon, CheckMarkIcon, ColorSwatchIcon, PhotographIcon, LeftArrowIcon, RightArrowIcon, DownloadIcon, ShareIcon, RssIcon } from 'components/Icons'

type Props = {
  readerSettings: ReaderSettings,
  updateReaderSettings: (newReaderSettings: ReaderSettings) => void,
  chapters: Chapter[],
  chapter: string,
  updateChapter: (newChapter: string) => void,
  page: string,
  pages: string[],
  updatePage: (newPage: string) => void,
}

const MangaControl: React.FunctionComponent<Props> = (props: Props) => {
  const [menu, setMenu] = useState(true)
  const { readerSettings, updateReaderSettings, chapter, chapters, updateChapter, page, pages, updatePage } = props;

  const changeReaderMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateReaderSettings({...readerSettings, readerMode: event.currentTarget.value as ReaderMode });
  };
  const changeImageSizing = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateReaderSettings({...readerSettings, imageSizing: event.currentTarget.value as ImageSizing });
  };
  const changeColourTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateReaderSettings({...readerSettings, colourTheme: event.currentTarget.value as ColourTheme });
  };
  const changeChapter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateChapter(event.currentTarget.value);
  };
  const changePage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updatePage(event.currentTarget.value);
  };



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
          <select className="subtitle dropdown" onChange={changeChapter} value={chapter}>
            {Object.values(chapters).map((chapter: Chapter, index: number) =>
              (<option className="subtitle" value={index} key={chapter.name}>{index}</option>) 
            )}    
          </select>
        </div>

         <div className="control">
          <div className="control-title">
            <BookmarkIcon/>
            <div className="title">Page</div>
          </div>
          <select className="subtitle dropdown" onChange={changePage} value={page}>
            {Object.values(pages).map((page: string) =>
              (<option className="subtitle" value={page} key={page}>{page}</option>) 
            )}    
          </select>
        </div>
  
        <div className="control">
          <div className="control-title">
            <BookOpenIcon/> 
            <div className="title">Reading Mode</div>
          </div>
          <select className="subtitle dropdown" onChange={changeReaderMode} value={readerSettings.readerMode}>
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
          <select className="subtitle dropdown" onChange={changeImageSizing} value={readerSettings.imageSizing}>
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
            <input type="color" defaultValue="#ff0000" />
            <select className="subtitle dropdown w-full" onChange={changeColourTheme} value={readerSettings.colourTheme}>
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
