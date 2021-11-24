
export type Themes = {
  [themeName: string]: ThemeSettings
}

export type ThemeSettings = {
  [themeOption: string]: string
}

const colorThemes: Themes = {
  'Light': {
    'panelBackground': '#F3F4F6',
    'primaryText': '#374151',
    'background': '#FFF',
    'secondaryText': '#374151',
    'link1': '#eebeb0',
    'link2': '#eebeb0',
    'link3': '#eebeb0',
    'link4': '#eebeb0'
  },
  'Dark': {
    'panelBackground': '#1e293b',
    'primaryText': '#FFF',
    'background': '#0f172a',
    'secondaryText': '#FFF',
    'link1': '#eebeb0',
    'link2': '#eebeb0',
    'link3': '#eebeb0',
    'link4': '#eebeb0'
  },
  'Olivia': {
    'panelBackground': '#2b2b2b',
    'primaryText': '#eebeb0',
    'background': '#f1ede9',
    'secondaryText': '#2b2b2b',
    'link1': '#eebeb0',
    'link2': '#eebeb0',
    'link3': '#eebeb0',
    'link4': '#eebeb0'
  },
  'Mizu': {
    'panelBackground': '#253646',
    'primaryText': '#f9f6f3',
    'background': '#b6d9eb',
    'secondaryText': '#253646',
    'link1': '#f9f6f3',
    'link2': '#f9f6f3',
    'link3': '#f9f6f3',
    'link4': '#f9f6f3'
  },
  'Oblivion Hagoromo': {
    'panelBackground': '#464647',
    'primaryText': '#e3dcd0',
    'background': '#e3dcd0',
    'secondaryText': '#464647',
    'link1': '#008aba',
    'link2': '#79c23c',
    'link3': '#ad98c7',
    'link4': '#fe4321'
  },
  'Modo Light': {
    'panelBackground': '#737576',
    'primaryText': '#56585a',
    'background': '#d1d1cf',
    'secondaryText': '#56585a',
    'link1': '#a0c6bc',
    'link2': '#a0c6bc',
    'link3': '#a0c6bc',
    'link4': '#a0c6bc'
  },
  'Oblivion': {
    'panelBackground': '#464647',
    'primaryText': '#e3dcd0',
    'background': '#636b6b',
    'secondaryText': '#e3dcd0',
    'link1': '#008aba',
    'link2': '#79c23c',
    'link3': '#ad98c7',
    'link4': '#fe4321'
  },
  'Botanical': {
    'panelBackground': '#3E5D58',
    'primaryText': '#92ACA0',
    'background': '#DDE5ED',
    'secondaryText': '#3E5D58',
    'link1': '#92ACA0',
    'link2': '#92ACA0',
    'link3': '#92ACA0',
    'link4': '#92ACA0'
  },
  'Patisserie': {
    'panelBackground': '#f6dfd8',
    'primaryText': '#da7157',
    'background': '#f7f2ea',
    'secondaryText': '#da7157',
    'link1': '#da7157',
    'link2': '#da7157',
    'link3': '#da7157',
    'link4': '#da7157'
  },
  'Serika': {
    'panelBackground': '#FFCD00',
    'primaryText': '#171718',
    'background': '#ece4d0',
    'secondaryText': '#171718',
    'link1': '#171718',
    'link2': '#171718',
    'link3': '#171718',
    'link4': '#171718'
  },
  'Sumi': {
    'panelBackground': '#f7f2ea',
    'primaryText': '#191e28',
    'background': '#191e28',
    'secondaryText': '#f7f2ea',
    'link1': '#cc2c24',
    'link2': '#cc2c24',
    'link3': '#cc2c24',
    'link4': '#cc2c24'
  },
  'Shoko': {
    'panelBackground': '#7A99AC',
    'primaryText': '#DDE5ED',
    'background': '#DDE5ED',
    'secondaryText': '#7A99AC',
    'link1': '#99D6EA',
    'link2': '#99D6EA',
    'link3': '#99D6EA',
    'link4': '#99D6EA'
  },
  'Tuzi': {
    'panelBackground': '#8d8bb2',
    'primaryText': '#e1dfed',
    'background': '#e1dfed',
    'secondaryText': '#8d8bb2',
    'link1': '#7e4f7b',
    'link2': '#7e4f7b',
    'link3': '#7e4f7b',
    'link4': '#7e4f7b'
  },
  'Bingsu': {
    'panelBackground': '#533d44',
    'primaryText': '#e1dbd1',
    'background': '#946877',
    'secondaryText': '#e1dbd1',
    'link1': '#e1dbd1',
    'link2': '#e1dbd1',
    'link3': '#e1dbd1',
    'link4': '#e1dbd1'
  },
  'Muted Sleeves': {
    'panelBackground': '#B1B3B3',
    'primaryText': '#171718',
    'background': '#D9D9D6',
    'secondaryText': '#171718',
    'link1': '#ABCAE9',
    'link2': '#ABCAE9',
    'link3': '#ABCAE9',
    'link4': '#ABCAE9',
    'logo': '#ECC3B2'
  },
  'Minimal sleeves': {
    'panelBackground': '#f7f2ea',
    'primaryText': '#171718',
    'background': '#f7f2ea',
    'secondaryText': '#171718',
    'link1': '#ABCAE9',
    'link2': '#ABCAE9',
    'link3': '#ABCAE9',
    'link4': '#ABCAE9',
    'logo': '#ECC3B2'
  },
  'Nimbus': {
    'panelBackground': '#e1dbd1',
    'primaryText': '#393b3b',
    'background': '#ACDCF1',
    'secondaryText': '#393b3b',
    'link1': '#393b3b',
    'link2': '#393b3b',
    'link3': '#393b3b',
    'link4': '#393b3b',
    'logo': '#393b3b'
  },
  'Yuru': {
    'panelBackground': '#712F3E',
    'primaryText': '#E1DBD1',
    'background': '#E1DBD1',
    'secondaryText': '#712F3E',
    'link1': '#88D4CC',
    'link2': '#88D4CC',
    'link3': '#88D4CC',
    'link4': '#88D4CC',
    'logo': '#88D4CC'
  },
  'Cafe': {
    'panelBackground': '#3d3635',
    'primaryText': '#d8d2c3',
    'background': '#d8d2c3',
    'secondaryText': '#3d3635',
    'link1': '#d0b084',
    'link2': '#d0b084',
    'link3': '#d0b084',
    'link4': '#d0b084',
    'logo': '#d0b084'
  },
  'Metaverse': {
    'panelBackground': '#171718',
    'primaryText': '#f7f2ea',
    'background': '#f7f2ea',
    'secondaryText': '#171718',
    'link1': '#dd1126',
    'link2': '#dd1126',
    'link3': '#dd1126',
    'link4': '#dd1126',
    'logo': '#dd1126'
  },
  'November Fog': {
    'panelBackground': '#94A59E',
    'primaryText': '#58534B',
    'background': '#D9E1E2',
    'secondaryText': '#58534B',
    'link1': '#58534B',
    'link2': '#58534B',
    'link3': '#58534B',
    'link4': '#58534B',
    'logo': '#58534B'
  }
}

export default colorThemes;
