
export interface ReaderSettings {
  readerMode: ReaderMode,
  imageSizing: ImageSizing 
}

export enum ReaderMode {
  longStrip = 1,
  scrolling
}

export enum ImageSizing {
  fitWidth = 1,
  fitHeight
}

