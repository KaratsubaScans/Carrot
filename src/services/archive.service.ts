
import { unzip } from 'zlib';
import axios from 'axios';

const zippedHex = '504b03040a0000000000f3a1b35244223c2a150000001500000008001c0066696c65312e6d64555409000329aaa5603daaa56075780b000104e803000004e803000068656c6c6f20746869732069732066696c6520310a504b03040a0000000000f7a1b352decbc02d1e0000001e00000008001c0066696c65322e6d64555409000331aaa5603daaa56075780b000104e803000004e803000068656c6c6f20746869732069732066696c65206e756d6265722074776f0a504b01021e030a0000000000f3a1b35244223c2a1500000015000000080018000000000001000000a4810000000066696c65312e6d64555405000329aaa56075780b000104e803000004e8030000504b01021e030a0000000000f7a1b352decbc02d1e0000001e000000080018000000000001000000a4815700000066696c65322e6d64555405000331aaa56075780b000104e803000004e8030000504b050600000000020002009c000000b70000000000'

export const fetchZip = (zip_url: string) => {
  axios.get(zip_url, { responseType: 'arraybuffer' })
    .then(response => console.log(Buffer.from(response.data, 'binary').toString('hex')));
}

export const extractZip = () => {
  const buffer = Buffer.from('eJzT0yMAAGTvBe8=', 'base64')
  unzip(buffer, (err, buf) => {
      console.log(err);
      console.log(buf)
    }
  );
}

/* retrieves list of file names in zip file */
export const getFileList = () => {
  /* assuming that zip has no comment in it */
  const tail = zippedHex.slice(-4); // 2 bytes
  if (tail != "0000") console.error("Invalid Zip: expecting no zip comment");

  /* find the beginning of the central directory */
  const cdStart = bufReadInt(zippedHex, -12, -4); // 4 bytes
  const cdSize = bufReadInt(zippedHex, -20, -12); // 4 bytes
  const cdRecCount = bufReadInt(zippedHex, -24, -20); // 2 byes

  // console.log(cdStart)
  console.log(zippedHex.slice(cdStart-9, cdStart-1+20))
  /* the problem is that the value stored in offset buffer is OCT-OFFSET !! */
}

/* reads a little endian hex buffer and returns value as int */
const bufReadInt = (buf: string, start: number, end: number) => {
  console.log(buf.slice(start, end))
  return parseInt(toLittleEd(buf.slice(start, end)), 16);
}

/* big ed to little ed - need to fix up this func*/
const toLittleEd = (buf: string) => {
    const littleBuf = buf.replace(/^(.(..)*)$/, "0$1").match(/../g);
    if (littleBuf == null) { console.error('problem covnerting to little ed'); return "" }
    return littleBuf.reverse().join("");
}