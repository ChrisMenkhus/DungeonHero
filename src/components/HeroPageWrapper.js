import styled from 'styled-components';


const HeroPageWrapper = styled.div`
  width: 100%;
  display: flex; flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0rem;
  background-color: ${props => props.color ? props.color : 'blue'};

  padding-bottom: 5rem;

  margin-top: 1.2rem;

  h4 {
    text-align: center; 
    text-indent: 1rem;
    border-bottom: 1px solid white;
    width: 60vw;
    margin: auto auto auto auto;
    padding-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    height: 2.1rem;
    color: white;
    font-weight: lighter;

  }

  h3 {
    text-align: center;
    font-weight: lighter;
    font-size: 1rem;
  }

  .saveButton {
    color: white;
    font-size: 0.8rem;
    padding: 0.2rem; 
    margin-top: 1rem;
    width: 8rem;
  }

  p {
    margin: auto;
    text-align: center;
    font-size: 0.5rem;
    padding: 0px;
  }
`;

export default HeroPageWrapper;