# 🥕Carrot - KaratsubaScans Manga Reader

React webapp that can read zipped manga files from url. Built for KaratsubaScans manga.

## Running for development

Switch to node version 14.17.6 LTS using nvm:
```
$ nvm install 14.17.6
$ nvm use
```

Start a development server with
```
npm start
```

For it to read manga, make sure to set up a `config.tsx` file, with 
`API_URL` to get manga. In order for Carrot to work, you must enable some sort of
auto indexing for file sharing, as well as JSON mode for those files.

## :exclamation: Stay up to date with our development
[Kanban Board](https://kanban.zhehaizhang.com/?controller=BoardViewController&action=readonly&token=df45317b6086af2d5de629c55abec8fa203f54604beae08319aa5c48f2ba)
