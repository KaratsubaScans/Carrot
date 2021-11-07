
export interface ReaderSettings {
  readerMode: ReaderMode,
  imageSizing: ImageSizing,
  colourTheme: ColourTheme,
}

export enum ReaderMode {
  longStrip = "Long Strip",
  scrolling = "Scrolling"
}

export enum ImageSizing {
  fitWidth = "Fit Width",
  fitHeight = "Fit Height"
}

export enum ColourTheme {
  light = "Light",
  dark = "Dark"
}

