import styled from 'styled-components';
import * as Colors from '../Colors.js'

const Button = styled.button`     
  margin: 0.5rem auto 0.5rem auto;
  text-align: center;
  border: none; 
  color: #313131;
  border-radius: 0.2rem;
  width: 50%;
  font-weight: bold;
  background-color: ${props => props.color ? props.color : Colors.primary};
`;

export default Button;