import styled from 'styled-components';
import * as Colors from '../Colors.js'


const HeroPageWrapper = styled.div`
  width: 100%;
  display: flex; flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0rem;
  background-color: ${props => props.color ? props.color : 'blue'};
  h4 {
    text-align: center; 
    text-indent: 1rem;
    border-bottom: 1px solid white;
    width: 60vw;
    margin: auto auto auto auto;
    padding-top: 0.2rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    height: 2.1rem;
    color: white;
    font-weight: lighter;

  }

  .saveButton {
    color: white;
    font-size: 0.8rem;
    padding: 0.2rem; 
    margin-top: 1rem;
    width: 8rem;
  }
`;

export default HeroPageWrapper;