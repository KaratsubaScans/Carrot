import axios from 'axios';
import { Chapter } from 'types/reader.types';

export const getChapters = async (mangafile: string, chapter: string): Promise<Chapter[]> => {

    const url = `https://files.karatsubascans.com/${mangafile}/jpg/chapter${chapter}`;
    let {data: chapters} = await axios.get(url);

    // filter out useless stuff
    chapters = chapters.map((chapter: Record<string, unknown>) => (
      {
        name: chapter.name,
      }
    ));
    return chapters;


};

