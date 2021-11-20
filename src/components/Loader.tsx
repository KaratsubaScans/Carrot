import React, { Component } from 'react';
import './Loader.css'
type Props = {
  refImg?: React.RefObject<HTMLImageElement | HTMLDivElement> | undefined
}
const Loader = (props: Props) => {

  return (
    <div className="loader" ref={props.refImg}>
      <div className="loader-container">
        <div className=" bg-gray-200 rounded-3xl w-full h-full"></div>
      </div>
    </div>
  );

}

export default Loader;
