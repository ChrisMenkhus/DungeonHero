
import styled from 'styled-components';
import {background_superdark, secondary} from '../Colors.js'

const Navbar = styled.nav`
  width: 100%;
  min-height: 3rem;
  display: flex;
  z-index: 5;
  flex-wrap: nowrap;
  background-color: ${background_superdark};
  background-color: #111111;

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
      margin-left: 1rem;
      margin-right: 0rem;
      padding:0px; 
      display: inline;
      width: auto;
      border-bottom: 2px solid white;
    }  

    .navItem:hover {
      border-bottom: 4px solid ${secondary};
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
      border-bottom: 0px;
      color: ${secondary};
    }
    .title:hover {
      border-bottom: 0px;
    }
  }
  



`;

export default Navbar;
