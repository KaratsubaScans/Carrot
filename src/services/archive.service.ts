
import axios from 'axios';

export type ZipInfo = {
  filename: string,
  contents: string
}

// const zippedHex = '504b03040a0000000000f3a1b35244223c2a150000001500000008001c0066696c65312e6d64555409000329aaa5603daaa56075780b000104e803000004e803000068656c6c6f20746869732069732066696c6520310a504b03040a0000000000f7a1b352decbc02d1e0000001e00000008001c0066696c65322e6d64555409000331aaa5603daaa56075780b000104e803000004e803000068656c6c6f20746869732069732066696c65206e756d6265722074776f0a504b01021e030a0000000000f3a1b35244223c2a1500000015000000080018000000000001000000a4810000000066696c65312e6d64555405000329aaa56075780b000104e803000004e8030000504b01021e030a0000000000f7a1b352decbc02d1e0000001e000000080018000000000001000000a4815700000066696c65322e6d64555405000331aaa56075780b000104e803000004e8030000504b050600000000020002009c000000b70000000000'

export const fetchZip = (zip_url: string) => {
  axios.get(zip_url, { responseType: 'arraybuffer' })
    .then(response => console.log(getFileList(Buffer.from(response.data, 'binary').toString('hex'))));
}

export const extractZip = () => {
  return;
}

/* retrieves list of file names in zip file along with their contents */
export const getFileList = (zippedHex: string) => {

  const zipInfoList: ZipInfo[] = [];

  const EOCD_start = zippedHex.lastIndexOf(flopEd('06054b50'))/2; // might be dangerous to assume divisible by 2
  const CD_count =   bufReadInt(zippedHex, EOCD_start+10, EOCD_start+10+2); // offset 10 bytes; length 2 bytes
  // const CD_size =    bufReadInt(zippedHex, EOCD_start+12, EOCD_start+12+4); // offset 12 bytes; length 4 bytes
  let CD_offset =    bufReadInt(zippedHex, EOCD_start+16, EOCD_start+16+4); // offset 16 bytes; length 4 bytes

  /* double check for central dir header */
  for (let i = 0; i < CD_count; i++) {

    const CD_header = bufReadStr(zippedHex, CD_offset, CD_offset+4); // length 4 bytes
    if (CD_header !== '02014b50') {
      console.error('Invalid Header: Central Header');
      return [];
    }

    /* read information from central header */
    /* right now assuming that file is uncompressed */
    const file_comp_size =  bufReadInt(zippedHex, CD_offset+20, CD_offset+20+4);
    const filename_length = bufReadInt(zippedHex, CD_offset+28, CD_offset+28+2);
    const extra_length =    bufReadInt(zippedHex, CD_offset+30, CD_offset+30+2);
    const comment_length =  bufReadInt(zippedHex, CD_offset+32, CD_offset+32+2);
    const file_offset =     bufReadInt(zippedHex, CD_offset+42, CD_offset+42+4);

    const filename = hexToAscii(flopEd(bufReadStr(zippedHex, CD_offset+46, CD_offset+46+filename_length)));

    /* read information from local header */
    const LH_filename_length = bufReadInt(zippedHex, file_offset+26, file_offset+26+2);
    const LH_extra_length =    bufReadInt(zippedHex, file_offset+28, file_offset+28+2);

    /* possibly double check these fields match what was read in central header */

    const file_contents_offset = file_offset+30+LH_filename_length+LH_extra_length;
    const file_contents = hexToAscii(flopEd(bufReadStr(zippedHex, file_contents_offset, file_contents_offset+file_comp_size)));

    zipInfoList.push({ filename: filename, contents: file_contents });

    CD_offset += (46+filename_length+extra_length+comment_length);
  }

  return zipInfoList;
}

/* reads a little endian hex buffer and returns value as int */
/* nubmers it takes in are in bytes (notice that a hex string 'a0' is 1 byte) */
const bufReadStr = (buf: string, start: number, end: number) => {
  // console.log(buf.slice(start, end))
  return flopEd(buf.slice(start*2, end*2));
}

/* wrapper around bufReadStr to also convert to number */
const bufReadInt = (buf: string, start: number, end: number) => {
  return parseInt(bufReadStr(buf, start, end), 16);
}

/* converts a hexstring into ascii characters */
const hexToAscii = (hexstring: string) => {
  let asciiStr = '';
  for (let i = 0; i < hexstring.length; i += 2) {
    asciiStr += String.fromCharCode(parseInt(hexstring.slice(i, i+2), 16));
  }
  return asciiStr;
}

/* flop the endianess - need to fix up this func*/
const flopEd = (buf: string) => {
    const littleBuf = buf.replace(/^(.(..)*)$/, "0$1").match(/..?/g);
    if (littleBuf == null) { console.error('Conversion Error: Possibly have odd length hex string.'); return "" }
    return littleBuf.reverse().join("");
}
