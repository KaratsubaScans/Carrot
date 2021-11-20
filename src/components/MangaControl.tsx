import React, { useState } from 'react';

import { ReaderSettings, ReaderMode, ImageSizing, ColourTheme, Menu, Chapter, Page } from 'types/reader.types';
import 'components/MangaControl.css';
import {
  TitleIcon,
  BookmarkIcon,
  BookOpenIcon,
  CheckMarkIcon,
  ColorSwatchIcon,
  PhotographIcon,
  LeftArrowIcon,
  RightArrowIcon,
  DownloadIcon,
  ShareIcon,
  RssIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'components/Icons'

type Props = {
  mangaName: string,
  readerSettings: ReaderSettings,
  updateReaderSettings: (newReaderSettings: ReaderSettings) => void,
  chapters: Chapter[],
  chapter: number,
  nextChapter: () => void,
  previousChapter: () => void,
  updateChapter: (newChapter: number) => void,
  page: number,
  pages: Page[],
  nextPage: () => void,
  previousPage: () => void,
  updatePage: (newPage: number) => void,
}

const MangaControl: React.FunctionComponent<Props> = (props: Props) => {
  const { readerSettings, updateReaderSettings, chapter, chapters, updateChapter, page, pages, updatePage } = props;
  const changeMenuState = () => {
    updateReaderSettings({ ...readerSettings, menu: readerSettings.menu === Menu.open ? Menu.close : Menu.open, });
  };
  const changeReaderMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateReaderSettings({ ...readerSettings, readerMode: event.currentTarget.value as ReaderMode });
  };
  const changeImageSizing = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateReaderSettings({ ...readerSettings, imageSizing: event.currentTarget.value as ImageSizing });
  };
  const changeColourTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateReaderSettings({ ...readerSettings, colourTheme: event.currentTarget.value as ColourTheme });
  };
  const changeChapter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.currentTarget.value);
    updateChapter(+event.currentTarget.value);
  };
  const changePage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updatePage(+event.currentTarget.value);
  };



  return (
    <div className="menuWrapper no-scrollbar pr-12">
      <div className={readerSettings.menu === Menu.open ? "menu" : "menu menu-closed"}>
        <div className="absolute inset-y-0 right-0 flex justify-center items-center mr-2">
          <button onClick={() => { changeMenuState() }} className="bg-gray-100 dark:bg-gray-700 p-2 shadow-lg rounded">
            {readerSettings.menu === Menu.open ? <LeftArrowIcon /> : <RightArrowIcon />}
          </button>
        </div>
        <div>
          <TitleIcon className="float-left mr-2" />
          <div className="heading">
            {props.mangaName}
            <CheckMarkIcon className="inline-block" />
          </div>
        </div>
        <div className="control">
          <div className="control-title">
            <BookmarkIcon />
            <div className="title">Chapter</div>
          </div>
          <div className="control-title">
            <button onClick={() => props.previousChapter()}>
              <ChevronLeftIcon className="flex-none" />
            </button>
            <select className="subtitle dropdown flex-grow" onChange={changeChapter} value={chapter}>
              {Object.values(chapters).map((chapter: Chapter, index: number) =>
                (<option className="subtitle" value={index} key={index}>{index + 1}</option>)
              )}
            </select>
            <button onClick={() => props.nextChapter()}>
              <ChevronRightIcon className="flex-none" />
            </button>
          </div>
        </div>

        <div className="control">
          <div className="control-title">
            <BookmarkIcon />
            <div className="title">Page</div>
          </div>
          <div className="control-title">
            <button onClick={() => props.previousPage()}>
              <ChevronLeftIcon className="flex-none" />
            </button>
            <select className="subtitle dropdown flex-grow" onChange={changePage} value={page}>
              {Object.values(pages).map((page: Page, index: number) =>
                (<option className="subtitle" value={index} key={index}>{index + 1}</option>)
              )}
            </select>
            <button onClick={() => props.nextPage()}>
              <ChevronRightIcon className="flex-none" />
            </button>
          </div>
        </div>

        <div className="control">
          <div className="control-title">
            <BookOpenIcon />
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
            <PhotographIcon />
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
            <ColorSwatchIcon />
            <div className="title">Colour Theme</div>
          </div>
          <div className="control-title">
            <input type="color" defaultValue="#ff0000" />
            {/*
            <select className="subtitle dropdown w-full" onChange={changeColourTheme} value={readerSettings.colourTheme}>
              {Object.values(ColourTheme).map((item: string) =>
                (<option className="subtitle" value={item} key={item}>{item}</option>)
              )}
            </select>
            */
            }
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
            <ShareIcon />
          </button>
          <button>
            <RssIcon />
          </button>
          <button>
            <DownloadIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MangaControl;
