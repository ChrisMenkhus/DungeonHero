import styled from 'styled-components';
import * as Colors from '../Colors.js'

const TextField = styled.textarea`
    min-height: 12.1rem;
    height: auto;
    display: flex;
    width: 100%;
    min-width: 1rem;
    font-size: 0.9rem;
    padding: 0px;
    margin: 0px;
    background-color: #E3E3E3;
    border: none;
    color: black;
    text-align: center;
    resize: none;
    overflow: hidden;

    &:focus {
      box-shadow: 0 0 5px white;
    }
`;

export default TextField;