import styled from 'styled-components';


const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  margin: 0.2rem 0.2rem auto 0.2rem;
  background-color: ${props => props.bgColor ? props.bgColor : '#191919'};
  max-width: 14rem;
  width: 14rem;
  min-width: 8rem;
  /*border-radius: 0.5rem;*/

/*  border: 4px solid ${props => props.color ? props.color : '#191919'};*/
  
  h1 {
    text-align: center;
    font-size: 1rem;
    font-weight: lighter;
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
  border-top: 50px solid ${props => props.color ? props.color : '#191919'};
  border-left: 60px solid transparent; 
  }

  .logoSpot {
    height: 0rem;
    .logoImg {
    height: 1.1rem; width: 1.1rem;
    position: relative;
    bottom: 1.55rem;
    left: 12.75rem;
  }
  }

`;

export default SectionWrapper;