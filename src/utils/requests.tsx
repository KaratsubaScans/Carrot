import axios from 'axios';
import { Chapter, Page } from 'types/reader.types';
import { API_URL } from 'config'

export const getPages = async (mangafile: string, chapter: string): Promise<Page[]> => {

    const url = `${API_URL}/${mangafile}/jpg/${chapter}`;
    let {data: pages} = await axios.get(url);

    // filter out useless stuff
    pages = pages.map((page: Record<string, unknown>) => (
      {
        name: page.name,
      }
    ));
    return pages;
};

export const getChapters = async (mangafile: string): Promise<Chapter[]> => {

    const url = `${API_URL}/${mangafile}/jpg`;
    let {data: chapters} = await axios.get(url);

    // filter out useless stuff
    chapters = chapters.reduce((result: Chapter[], chapter: Record<string,unknown>) => {
      const name = chapter.name as string;
      if (!name.includes('.zip')) {
        result.push({name: name})
      }
      return result;
    }, []);
    return chapters;
};
