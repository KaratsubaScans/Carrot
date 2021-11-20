
export interface ReaderSettings {
  readerMode: ReaderMode,
  imageSizing: ImageSizing,
  colourTheme: ColourTheme,
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