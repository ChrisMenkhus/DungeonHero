import React from 'react';
import styled from 'styled-components';
import {background_primary, background_secondary, background_tertiary, accent, interactive} from '../Colors.js'
import Button from '../components/Button.js'
import bg from '../images/bg.jpg'

const Style = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${background_tertiary};
 
  text-align: center;
  display: flex;
  flex-direction: column;
  //background-image: url(${bg});
  background-size: cover;
  background-attachment: fixed;

  color: black;

  &:before {
    display: block;
    content:'';
    height: 10vh;
    
    background-color: ${background_primary};

    clip-path: polygon(100% 0, 0 0, 100% 100%);
  }
  &:after {
    display: block;
    content:'';
    height: 10vh;
    position: relative; bottom: 0rem;
    
    background-color: ${background_primary};
/*    -moz-transform: skew(0deg, 5deg);
    -webkit-transform: skew(0deg, 5deg);
    -o-transform: skew(0deg, 5deg);
    -ms-transform: skew(0deg, 5deg);
    transform: skew(0deg, 5deg);*/

    clip-path: polygon(0 0, 0% 100%, 100% 100%);
    margin-bottom: 0px;
  }


  .messyButtonContainer {
    margin: auto; padding: 0px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

/*  @keyframes bgcolor {
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
  }*/

  .head {
    padding-top: 4rem;
    height: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    



    -webkit-animation: bgcolor 20s infinite;
    animation: bgcolor 10s infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;

    button {
      margin-top: 0rem;
      font-size: 1.2rem;
      width: 12rem;
      padding: 1rem;
      border-radius: 0px;
      margin-bottom: 1rem;
      background-color: ${background_primary};
      text-indent: 5px;
      display: flex; flex-direction: row; justify-content: center;

      clip-path: polygon(6% 0, 100% 0, 94% 100%, 0% 100%);
      &:before {
          display: inline; content:'';
          background-color: white; width: 3px; height: 1.4rem;
      }

      &:first-child {
        margin-top: 2rem;
      }

      transition: all 0.1s;

      span {
        display: block;
        background-color: ${interactive};
        color: white;
/*        -ms-transform: skewX(20deg);
        -webkit-transform: skewX(20deg);
        transform: skewX(20deg);*/
      }


          &:hover {
          /*width: 90vw;*/
          

          span {
            /*width: 12rem;*/
          }
          
        
        }
    }



  }

  .siteInfo {
  margin-top: auto; margin-bottom: auto;
  .siteStatus {
    margin: auto;
    padding-top: 2rem;
    span {
      color: ${'white'}; 
      font-weight: lighter;
      font-size: 0.8rem;
    }
  }
  }

  h1 {
    font-size: 1.5rem;
    font-weight: light;
    margin-bottom: 20rem;
  }
  h2 {
    font-size: 1rem;
    font-weight: lighter;

  }

  .sentence {
    margin: auto auto 0px auto;
    width: auto;
    text-align: center;
    /*margin-bottom: 0.3rem;*/
    span {
    
    border-bottom: 3px solid ${accent};

    }
  }

  /*Vertical Sliding*/
  .slidingVertical{
    width: 12rem;
    text-align: left; 
    display: inline-block;
    margin: 0px auto 3rem auto;
    font-weight: lighter;
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

    border-bottom: 3px solid ${accent};
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
          Dont just play a <span>hero</span><br/>
        </h2>     
        <h1 className='slidingVertical'>
          Become a
          <span>hero</span>   
          <span>wizard</span>
          <span>master</span>
          <span>god</span>
          <span>legend</span>
        </h1>   
        {!props.loggedIn ? 
        <div className='messyButtonContainer'>
          <Button className='bigButton' onClick={()=>{props.setRedirectPath('/register')}} ><span>Begin Journey</span></Button>
          <Button className='bigButton loginButton' onClick={()=>{props.setRedirectPath('/login')}} ><span>Login</span></Button>
        </div> : 
        <div className='messyButtonContainer'>
          <Button className='bigButton red' onClick={()=>{props.setRedirectPath('/heroes')}} ><span>My Heroes</span></Button>
        </div> }
      </section>

      <section className='siteInfo'>
        <h2>Modern tools for the same classic adventures</h2>
        <div className='siteStatus'>
        {/* <h3>Pathfinder <span>alpha</span></h3> */}
        {/* <h3>5th edition <span>planned</span></h3> */}
        </div>
      </section>
    </Style>
    )
}

export default Home;
