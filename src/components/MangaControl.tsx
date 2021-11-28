import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import { ReaderSettings, ReaderMode, KeyBindings, ImageSizing, Chapter, Page } from 'types/reader.types';
import useTheme from 'hooks/useTheme'
import colourThemes from 'types/theme.types'
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

import Modal from './Modal';
import HotKeys from './HotKeys';
import Share from './Share';

type Props = {
  mangaName: string,
  mangafile: string,
  mangaType: string,
  readerSettings: ReaderSettings,
  updateReaderSettings: (newReaderSettings: Partial<ReaderSettings>) => void,
  keyBindings: KeyBindings,
  setKeyBindings: (newKeyBindings: KeyBindings) => void,
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
  const history = useHistory();
  const { readerSettings, updateReaderSettings, keyBindings, setKeyBindings, chapter, chapters, updateChapter, page, pages, updatePage, mangaType } = props;

  const [colourMode, setColourMode] = useTheme();
  const colourThemeValues = Object.keys(colourThemes)
  const toggleMenuState = () => {
    updateReaderSettings({ menuOpen: !readerSettings.menuOpen, });
  };
  const changeReaderMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateReaderSettings({ readerMode: event.currentTarget.value as ReaderMode });
  };
  const changeImageSizing = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateReaderSettings({ imageSizing: event.currentTarget.value as ImageSizing });
  };
  const changeColourTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColourMode(event.currentTarget.value)
    updateReaderSettings({ colourTheme: event.currentTarget.value });
  };
  const toggleAutoLoadChapter = () => {
    updateReaderSettings({ autoLoadChapter: !readerSettings.autoLoadChapter })
  }

  const changeChapter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateChapter(+event.currentTarget.value);
  };
  const changePage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updatePage(+event.currentTarget.value);
  };

  const [isOpenHotKeys, setIsOpenHotKeys] = useState(false);

  const [isOpenShare, setIsOpenShare] = useState(false);

  return (
    <div className="menuWrapper no-scrollbar pr-12">
      <div className={readerSettings.menuOpen ? "menu" : "menu menu-closed"}>
        <div className="absolute right-0 flex justify-center items-center vertical-center mr-2 h-20">
          <button onClick={() => { toggleMenuState() }} className="bg-panelBackgroundColour dark:bg-gray-700 p-2 shadow-lg rounded">
            {readerSettings.menuOpen ? <LeftArrowIcon /> : <RightArrowIcon />}
          </button>
        </div>
        <div>
          <TitleIcon className="float-left mr-2" />
          <div className="heading">
            <Link to={`/manga/${props.mangafile}`}>
              {props.mangaName}
            </Link>
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
            {Object.values(ReaderMode).map((readerMode: string) => {
              if (mangaType === 'manga' || readerMode === 'Long Strip') {
                return (<option className="subtitle" value={readerMode} key={readerMode}>{readerMode}</option>)
              }
            }
            )}
          </select>
        </div>

        <div className="control">
          <div className="control-title">
            <PhotographIcon />
            <div className="title">Image Size</div>
          </div>
          <select className="subtitle dropdown" onChange={changeImageSizing} value={readerSettings.imageSizing}>
            {Object.values(ImageSizing).map((item: string) => {
              if (mangaType === 'manga' || item === 'Original') {
                return (<option className="subtitle" value={item} key={item}>{item}</option>)
              }
            }
            )}
          </select>
        </div>

        <div className="control">
          <div className="control-title">
            <ColorSwatchIcon />
            <div className="title">Colour Theme</div>
          </div>
          <div className="control-title">
            <select className="subtitle dropdown w-full" onChange={changeColourTheme} value={readerSettings.colourTheme}>
              {Object.values(colourThemeValues).map((item: string) =>
                (<option className="subtitle" value={item} key={item}>{item}</option>)
              )}
            </select>
          </div>

        </div>
        <div>
          <button onClick={() => setIsOpenHotKeys(true)} className="bg-backgroundColour text-secondaryColour rounded py-2 px-4 hover:bg-primaryColour hover:text-panelBackgroundColour">
            HotKeys
          </button>
          <Modal title={'HotKeys'} isOpen={isOpenHotKeys} setIsOpen={setIsOpenHotKeys} buttonMsg="Close">
            <HotKeys settings={keyBindings} setSettings={setKeyBindings} />
          </Modal>
        </div>
        <div className="regular">
          <input type="checkbox" id="autoLoadChapter" checked={readerSettings.autoLoadChapter} onChange={() => toggleAutoLoadChapter()} />
          <label htmlFor="autoLoadChapter" className="px-2">Autoload next/previous chapters</label>
        </div>
        <div className="control-title">
          <button onClick={() => setIsOpenShare(true)}>
            <ShareIcon />
          </button>
          <Modal title={'Share'} isOpen={isOpenShare} setIsOpen={setIsOpenShare} buttonMsg="Close">
            <Share></Share>
          </Modal>
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
