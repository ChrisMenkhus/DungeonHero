import React from 'react';
import styled from 'styled-components';
import {background_superdark as background_verydark, label_red} from '../Colors.js'
import Button from '../components/Button.js'

import bg from '../images/bg.jpg'

const Style = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${background_verydark};
  text-align: center;
  display: flex;
  flex-direction: column;
  //background-image: url(${bg});
  background-size: cover;
  background-attachment: fixed;

  @keyframes bgcolor {
    0% {
        background-color: #45a3e5
    }

    30% {
        background-color: #66bf39
    }

    60% {
        background-color: #eb670f
    }

    90% {
        background-color: #f35
    }

    100% {
        background-color: #864cbf
    }
  }

  .head {
    padding-top: 4rem;
    height: 40vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    /*background-image: linear-gradient(45deg, ${label_red} 29.17%, ${background_verydark} 29.17%, ${background_verydark} 50%, ${label_red} 50%, ${label_red} 79.17%, ${background_verydark} 79.17%, ${background_verydark} 100%);*/
    /*background-color: rgba(255,255,255,0.05);*/



    -webkit-animation: bgcolor 20s infinite;
    animation: bgcolor 10s infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;

    button {
      margin-top: 2rem;
      font-size: 1.2rem;
      width: auto;
      padding: 1rem;
      margin-bottom: 5rem;
    }
  }

  .siteInfo {
  margin-top: auto; margin-bottom: auto;
  .siteStatus {
    margin: auto;
    margin-top: 2rem;
    span {
      color: ${label_red}; 
      font-weight: lighter;
      font-size: 0.8rem;
    }
  }
  }

  h1 {
    font-size: 1.5rem;
    font-weight: light;
  }
  h2 {
    font-size: 1rem;
    font-weight: lighter;
  }

  .sentence {
    margin: auto auto 0px auto;
    width: auto;
    text-align: center;
  }

  /*Vertical Sliding*/
  .slidingVertical{
    width: 12rem;
    text-align: left; 
    display: inline-block;
    margin: 0px auto 0px auto;
  }
  .slidingVertical span{
    animation: topToBottom 12.5s linear infinite 0s;
    -ms-animation: topToBottom 12.5s linear infinite 0s;
    -webkit-animation: topToBottom 12.5s linear infinite 0s;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    display: inline-block;
    width: 5rem;
    text-align: left;
    margin-left: 12px;
    border-bottom: 1px solid white;
  }
  .slidingVertical span:nth-child(2){
    animation-delay: 2.5s;
    -ms-animation-delay: 2.5s;
    -webkit-animation-delay: 2.5s;
  }
  .slidingVertical span:nth-child(3){
    animation-delay: 5s;
    -ms-animation-delay: 5s;
    -webkit-animation-delay: 5s;
  }
  .slidingVertical span:nth-child(4){
    animation-delay: 7.5s;
    -ms-animation-delay: 7.5s;
    -webkit-animation-delay: 7.5s;
  }
  .slidingVertical span:nth-child(5){
    animation-delay: 10s;
    -ms-animation-delay: 10s;
    -webkit-animation-delay: 10s;
  }

  /*topToBottom Animation*/
  @keyframes topToBottom{
    0% { opacity: 0; }
    5% { opacity: 0; -moz-transform: translateY(-50px); }
    10% { opacity: 1; -moz-transform: translateY(0px); }
    25% { opacity: 1; -moz-transform: translateY(0px); }
    30% { opacity: 0; -moz-transform: translateY(50px); }
    80% { opacity: 0; }
    100% { opacity: 0; }
  }
`;

const Home = (props) => {
  return (
    <Style>
      <section className='head'>
        <h2 className='sentence'>
          Dont just play a hero <br/>
        </h2>     
        <h1 className='slidingVertical'>
          Become a
          <span>hero</span>   
          <span>wizard</span>
          <span>fighter</span>
          <span>god</span>
          <span>BBEG</span>
        </h1>   
        <div>
          <Button onClick={()=>{props.setRedirectPath('/register')}} >Begin Journey</Button>
        </div>
      </section>

      <section className='siteInfo'>
        <h2>Modern tools for the same classic adventures</h2>
        <div className='siteStatus'>
        <h3>Pathfinder <span>alpha</span></h3>
        <h3>5th edition <span>planned</span></h3>
        </div>
      </section>
    </Style>
    )
}

export default Home;
