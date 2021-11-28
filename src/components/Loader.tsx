import React, { Component } from 'react';
import './Loader.css'
type Props = {
  refImg?: React.RefObject<HTMLImageElement | HTMLDivElement> | undefined
  classProps?: string,
}
const Loader = (props: Props) => {

  return (
    <div className="loader" ref={props.refImg}>
      <div className={(props.classProps || 'w-full h-full') + ' animate-pulse'}>
        <div className=" bg-gray-100 rounded-3xl w-full h-full"></div>
      </div>
    </div>
  );

}

export default Loader;
