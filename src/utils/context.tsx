import React, { useState, useContext, useCallback } from 'react';

const Context = React.createContext(null);

export const useCtx = () => useContext(Context);

type Props = {
  children: React.ReactNode
}
const CtxProvider = ({children} : Props) => {
  const [readerMode, _setReaderMode] = useState(true);
  const flipReaderMode = useCallback(
    function () {
      _setReaderMode(!readerMode);
    },
    [readerMode, _setReaderMode],
  );

  const defaultContext = {
    readerMode,
    flipReaderMode,
  };

  return (<Context.Provider value={ defaultContext }> {children} </Context.Provider>);
};

export default CtxProvider;