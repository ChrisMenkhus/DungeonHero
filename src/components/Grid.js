import React from 'react';
import styled from 'styled-components';
import {background_dark} from '../Colors.js'

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  width: auto;
  justify-content: ${props => props.justify ? props.justify : 'center'};
  align-content: center;
  margin: auto auto auto auto;
`;

export default Grid;