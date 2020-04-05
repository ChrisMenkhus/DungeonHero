import React from 'react';
import styled from 'styled-components';

import HexGrid from '../HexGrid.js'
import HexItem from '../HexItem.js'





const Style = styled.div`
  width: 100%;
  height: 100%;
  display: flex; flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 2rem;
  h4 {
    text-align: center; 
    width: 100%;
    margin: auto;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    color: white;
    font-weight: lighter;
  }
`;




const HeroDetailsPage = (props) => {

  return (
    <Style>
      <HexGrid>
        <HexItem>
          <h2>attack</h2>
        </HexItem>
        <HexItem/>
        <HexItem/>
        <HexItem/>
        <HexItem/>
        <HexItem/>

      </HexGrid>


    </Style>
  );
}

export default HeroDetailsPage;