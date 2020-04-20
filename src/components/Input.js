import styled from 'styled-components';
import * as Colors from '../Colors.js'

const Input = styled.input`
    display: flex;
    width: auto;
    min-width: 1rem;
    font-size: 0.9rem;
    padding: 0px;
    margin: 0rem auto 0rem auto;
    background-color: #E3E3E3;
    border: none;
    color: black;
    text-align: center;

    &:focus {
      box-shadow: 0 0 5px white;
      border: 1px solid white;
    }
`;

export default Input;