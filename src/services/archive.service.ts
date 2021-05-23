
import axios from 'axios';
import { inflate } from 'zlib';

export type ZipInfo = {
  filename: string,
  contents: Buffer
}

export const fetchZip = (zip_url: string) => {
  axios.get(zip_url, { responseType: 'arraybuffer' })
    .then(response => {
      const zipInfoList = getFileList(Buffer.from(response.data, 'binary'));
      // const fileList: ZipInfo[] = getFileList(Buffer.from(response.data, 'binary').toString('hex'));
      // extractZip(fileList[0].contents);
    });
}

/* takes in a hex string */
export const extractZip = (deflatedString: string) => {
  inflate(deflatedString, (err, buf) => {
    if (err) {
      console.error(err);
      return "";
    } else {
      console.log(buf);
    }

  });
}

/* retrieves list of file names in zip file along with their contents */
export const getFileList = (buf: Buffer) => {
  const zipInfoList: ZipInfo[] = [];

  const EOCD_start = buf.lastIndexOf(Buffer.from('504b0506', 'hex'));
  const CD_count =   buf.readIntLE(EOCD_start+10, 2);
  let CD_offset =  buf.readIntLE(EOCD_start+16, 4);

  /* double check for central dir header */
  for (let i = 0; i < CD_count; i++) {

    const CD_header = buf.slice(CD_offset, CD_offset+4);
    if (Buffer.compare(CD_header, Buffer.from('504b0102', 'hex'))) {
      console.error('Invalid Header: Central Header');
      return [];
    }

    /* read information from central header */
    /* right now assuming that file is uncompressed */
    const file_comp_size =  buf.readIntLE(CD_offset+20, 4);
    const filename_length = buf.readIntLE(CD_offset+28, 2);
    const extra_length =    buf.readIntLE(CD_offset+30, 2);
    const comment_length =  buf.readIntLE(CD_offset+32, 2);
    const file_offset =     buf.readIntLE(CD_offset+42, 4);

    const filename = buf.slice(CD_offset+46, CD_offset+46+filename_length).toString('ascii');

    /* read information from local header */
    const LH_filename_length = buf.readIntLE(file_offset+26, 2);
    const LH_extra_length =    buf.readIntLE(file_offset+28, 2);

    /* possibly double check these fields match what was read in central header */

    const file_contents_offset = file_offset+30+LH_filename_length+LH_extra_length;
    const file_contents = buf.slice(file_contents_offset, file_contents_offset+file_comp_size);

    zipInfoList.push({ filename: filename, contents: file_contents });

    CD_offset += (46+filename_length+extra_length+comment_length);
  }

  return zipInfoList;
}
