import React from 'react';
import styled from 'styled-components';
import {background_dark} from '../Colors.js'

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
  align-content: center;
  background-color: ${background_dark};
`;