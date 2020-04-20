
import styled from 'styled-components';
import {background_superdark, secondary, accent} from '../Colors.js'

const Navbar = styled.nav`
  position: absolute; top: 0px;

  width: 100%;
  min-height: 3rem;
  display: flex;
  z-index: 5;
  flex-wrap: nowrap;

  background-color: transparent;
  ion-icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: auto;
    margin-right: 1rem;
    margin-bottom: auto;
    color: white;
  }

  ul {
    font-size: 16px;
    list-style-type: none;
    width: 100%;
    padding: 0px; margin: auto;
    display: flex;
    flex-direction: row;



    .navItem {   
      margin: 0px; 
      margin-left: 0.5rem;
      margin-right: 0rem;
      padding:0px; 
      display: inline;
      width: auto;
      margin-top: 0.2rem;
      /*border-bottom: 2px solid white;*/
    }  

    .navItem:hover {
      /*border-bottom: 4px solid ${secondary};*/
    }
    .right {
      display: inline;
      width: auto;
      margin: 0px;

      margin-left: auto;
      float: right;
      margin-right: 1rem;
    } 

    .title {
      font-size: 20px;
      margin: 0px;
      margin-left: 1rem;
      border-bottom: 0px;
      background-color: ${background_superdark};
      /*border-right: ${props => props.loggedIn ? '1px solid white' : null };*/
      border-left: 6px solid ${accent};
      -ms-transform: skewX(-20deg);
      -webkit-transform: skewX(-20deg);
      transform: skewX(-20deg);
      color: white;
      
    }
    .title:hover {
      border-bottom: 0px;
    }
  }
  



`;

export default Navbar;
