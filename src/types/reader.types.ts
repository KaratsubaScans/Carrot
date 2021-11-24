
export interface ReaderSettings {
  readerMode: ReaderMode,
  imageSizing: ImageSizing,
  colourTheme: string,
  menuOpen: boolean,
  autoLoadChapter: boolean,
}

export enum ReaderMode {
  longStrip = "Long Strip",
  singlePage = "Single Page"
}

export enum ImageSizing {
  original = "Original",
  fitWidth = "Fit Width",
  fitHeight = "Fit Height"
}

export type Page = {
  name: string
};
export type Chapter = {
  name: string
};

export interface KeyBindings {
  previousPage: string,
  nextPage: string,
  previousChapter: string,
  nextChapter: string
}
