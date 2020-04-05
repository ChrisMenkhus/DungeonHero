import React from "react";
import styled from "styled-components";
import {background_superdark as background_verydark} from '../Colors.js'

const Test = props => {

const Style = styled.div`
  //min-height: 100vh;
/*  background-color: ${background_verydark};*/
  h1 {
    text-align: center;
    font-weight: lighter;
    margin-top: 0.25rem;
    }
  h2 {
    text-align: center;
    font-weight: lighter;
    margin: auto;
  }  

  #grid {
    background-color: #111;
    position: relative;
    width: 60%;
    margin: 0 auto;
    padding: 0px;

    @media only screen and (max-width: 620px) {
      width: 90%;
    }
  }

  #grid li {
    list-style-type: none;
    position: relative;
    float: left;
    width: 27.85714285714286%;
    padding: 0 0 32.16760145166612% 0;
    -o-transform: rotate(-60deg) skewY(30deg);
    -moz-transform: rotate(-60deg) skewY(30deg);
    -webkit-transform: rotate(-60deg) skewY(30deg);
    -ms-transform: rotate(-60deg) skewY(30deg);
    transform: rotate(-60deg) skewY(30deg);
    background: #fd005f;
    overflow: hidden;
    visibility: hidden;

  }

  #grid li:nth-child(6n+4) { 
    margin-left: 0.5%;
  }

  #grid li * {
    visibility: visible;
  }

  #grid li:nth-child(3n+2) {
  margin: 0 1%;
  }

  #grid li:nth-child(6n+4), #grid li:nth-child(6n+5), #grid li:nth-child(6n+6) {
    margin-top: -6.9285714285%;
    margin-bottom: -6.9285714285%;
    -o-transform: translateX(50%) rotate(-60deg) skewY(30deg);
    -moz-transform: translateX(50%) rotate(-60deg) skewY(30deg);
    -webkit-transform: translateX(50%) rotate(-60deg) skewY(30deg);
    -ms-transform: translateX(50%) rotate(-60deg) skewY(30deg);
    transform: translateX(50%) rotate(-60deg) skewY(30deg);
  }

  #grid li .hexagon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fdbf00;
    -o-transform: skewY(-30deg) rotate(60deg);
    -moz-transform: skewY(-30deg) rotate(60deg);
    -webkit-transform: skewY(-30deg) rotate(60deg);
    -ms-transform: skewY(-30deg) rotate(60deg);
    transform: skewY(-30deg) rotate(60deg);
    overflow: hidden;
    display: flex; height: 100%;
  }

  #grid li .hexagon:hover {
    
  }

`;

  return (
    <Style>
      <ul id='grid' class='clear'>
        {props.children}
      </ul>
    </Style>
  )
};

export default Test;
