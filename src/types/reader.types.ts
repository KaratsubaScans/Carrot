
export interface ReaderSettings {
  readerMode: ReaderMode,
  imageSizing: ImageSizing 
}

export enum ReaderMode {
  longStrip = "Long Strip",
  scrolling = "Scrolling"
}

export enum ImageSizing {
  fitWidth = "Fit Width",
  fitHeight = "Fit Height"
}

