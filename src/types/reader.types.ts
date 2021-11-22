
export interface ReaderSettings {
  readerMode: ReaderMode,
  imageSizing: ImageSizing,
  colourTheme: ColourTheme,
  menuOpen: boolean,
  autoLoadChapter: boolean,
}

export type PartialReaderSettings<ReaderSettings> = {
  [K in keyof ReaderSettings]: ReaderSettings[K] | undefined
}

export enum ReaderMode {
  longStrip = "Long Strip",
  singlePage = "Single Page"
}

export enum ImageSizing {
  fitWidth = "Fit Width",
  fitHeight = "Fit Height"
}

export enum ColourTheme {
  light = "light",
  dark = "dark"
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

export type PartialKeyBindings<KeyBindings> = {
  [K in keyof KeyBindings]: KeyBindings[K] | undefined
}