import React, { useState } from 'react';
import { CopyLinkIcon, CopyLinkSuccessIcon } from './Icons';

const Share: React.FunctionComponent = () => {

  const [copySuccess, setCopySuccess] = useState(false);

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleOnClick = async () => {
    setCopySuccess(true);
    navigator.clipboard.writeText(window.location.href)
    await sleep(2000);
    setCopySuccess(false);
  }

  return (
    <>
      <button onClick={() => handleOnClick()}>
        {
          copySuccess ? <CopyLinkSuccessIcon/> : <CopyLinkIcon/>
        }
      </button>
    </>
  );
}

export default Share;
