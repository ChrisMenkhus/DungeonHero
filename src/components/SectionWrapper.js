import styled from 'styled-components';
import * as Colors from '../Colors.js'


const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  margin: 0.2rem 0.5rem 0.5rem 0.2rem;
  margin: 0.5rem;
  background-color: ${props => props.bgColor ? props.bgColor : Colors.background_tertiary};
  max-width: 14rem;
  width: 14rem;
  min-width: 8rem;

  h1 {
    text-align: center;
    font-size: 1rem;
    font-weight: lighter;
    color: black;
    margin-top: -2rem;
  }

  padding: -50px;
  &:before {
  content: '';
  width: 0px;
  height: 0px;
  position: relative;
  left: 11rem;
  top: 0rem;
  border-top: 50px solid ${Colors.background_secondary};
  border-left: 60px solid transparent; 
  }

  .logoSpot {
    height: 0rem;
    .logoImg {
    height: 1.1rem; width: 1.1rem;
    position: relative;
    bottom: 1.55rem;
    left: 12.75rem;
    /*filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(103%);*/
    filter:brightness(0) saturate(100%) invert(99%) sepia(93%) saturate(0%) hue-rotate(88deg) brightness(108%) contrast(100%);

  }
  }

  .buttons {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column
  }

`;

export default SectionWrapper;