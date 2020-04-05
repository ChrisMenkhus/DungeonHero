import React from "react";
// import styled from "styled-components";

const Test = props => {
// const Style = styled.div`
// 
//   li .hexagon {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: #fdbf00;
//     -o-transform: skewY(-30deg) rotate(60deg);
//     -moz-transform: skewY(-30deg) rotate(60deg);
//     -webkit-transform: skewY(-30deg) rotate(60deg);
//     -ms-transform: skewY(-30deg) rotate(60deg);
//     transform: skewY(-30deg) rotate(60deg);
//     overflow: hidden;
//     display: flex; height: 100%;
//   }
// 
// `;

  return (
    <li><div className='hexagon'>
      {props.children}
    </div></li>
  )
};

export default Test;
