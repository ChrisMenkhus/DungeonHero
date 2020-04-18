import styled from 'styled-components';

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: auto;
  justify-content: ${props => props.justify ? props.justify : 'center'};
  align-content: center;
  margin: auto auto auto auto;
`;

export default Grid;