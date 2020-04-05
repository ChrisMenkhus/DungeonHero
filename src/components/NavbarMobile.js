
import styled from 'styled-components';
import {background_superdark, label_red} from '../Colors.js'

const Navbar = styled.nav`
  width: fit-content;
  min-height: 3rem;
  height: 100%;
  position: fixed;
  top: 0;
  display: flex;
  display: ${props => props.navToggled ? 'flex' : 'none'};
  flex-wrap: nowrap;
  background-color: ${background_superdark};
  z-index: 5;
  

  ul {
    list-style-type: none;
    width: auto;
    padding: 0px; margin: 4rem auto auto auto;
    padding-right: 2rem;
    display: flex;
    flex-direction: column;
    li {
      margin: 0px; 
      margin-left: 1rem;
      margin-right: 0rem;
      margin-bottom: 0.5rem;
      padding:0px; 
      display: inline;
      width: auto;
    }

    .navItem {

    }

    .navItem:hover {
      border-bottom: 4px solid ${label_red};
    }
    
  }

  .title {
    border-bottom: 1px solid white;
  }
  .title:hover {
      border-bottom: 0px;
  }

  ion-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
    margin: 0.25rem 0.5rem 0rem 0.25rem;

  }

`;

export default Navbar;
