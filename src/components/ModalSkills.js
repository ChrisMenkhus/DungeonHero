import React from 'react'
import styled from 'styled-components';
import * as Colors from '../Colors.js'

import Button from './Button.js'
import Input from './Input.js'


const Style = styled.div`
    display: ${props => props.display ? 'fixed' : 'none'};
    position: fixed;
    height: 100%;
    width: 100vw;
    
    background: ${Colors.background_primary};

    z-index: 99;

     overflow-x: hidden;
    overflow-y: hidden;

    pointer-events: block;

    #modal {
        z-index: 100;
        display: ${props => props.display ? 'flex' : 'none'};
        flex-direction: column;
        width: 16rem;
        height: auto;
        background-color: ${Colors.background_tertiary};

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        #header {
            background-color: ${Colors.background_primary};
            display: flex; flex-direction: row;
            justify-content: space-between;
            h2 {
                font-size: 0.8rem;
                text-indent: 0.3rem;
                font-weight: lighter;           
            }
            ion-icon {
                justify-content: flex-end;
                margin: 0.1rem 0.1rem;
                background-color: ${Colors.interactive};
                border: none;
                height: 0.6rem; width: 0.6rem;
                padding: 0.1rem;    
            }
            #buttons {
                display: flex;
                width: auto;
                margin: 0px; padding: 0px;
                margin-right: 0.2rem;
            }
        }
        #content {
        margin: 0.5rem auto 0.1rem;
        h3 {
            font-size: 0.8rem;
                    
            font-weight: lighter;
            text-align: center; 
        }
        h5 {
            width: auto;
            height: auto; 
            margin: 0px; padding: 0px;
            border-bottom: 0px;
            font-size: 0.5rem;
            text-align: center; 
            font-weight: lighter;
        }
        label {
            color: black;
        }
        }
        #applyButton {
            display: flex;
            margin: 0.5rem 0.5rem 0.1rem;
            button {
                
            }
        }      
    }

    .dropdown {
        display: inline-block;
        width: 100%;
    }

    .dropdown-content {
        width: 100%;
        display: flex;
        flex-direction: row; 
        button {
            width: 100%;
            margin: auto;
        }
    }

    .dropdown:hover .dropdown-content {
        display: flex;
    }
`;

const Modal = (props) => {
    return (
        <Style display={props.toggleModal === 'true' ? true : false} >
            <div id='modal'>
            <div id='header'>
                <h2>{props.modalTitle}</h2>
                <div id='buttons'>
                    <ion-icon name="close-outline" onClick={()=>props.setToggleModal(props.toggleModal === 'true' ? 'false' : 'true')}></ion-icon>
                </div>
            </div>
            <div id='content'>
                <label>{props.propertyValueName1}</label>
                <Input onChange={(e)=>{props.propertyHandler1(e.target.value)}}></Input>
                <div className='dropdown'>
                <label>{props.propertyValueName2}</label>
                <div className='dropdown-content'>
                    <Button color={props.propertyValue2 === 0 ? null : 'gray'} onClick={()=>{props.propertyHandler2(0)}}>Str</Button>
                    <Button color={props.propertyValue2 === 1 ? null : 'gray'} onClick={()=>{props.propertyHandler2(1)}}>Dex</Button>
                    <Button color={props.propertyValue2 === 2 ? null : 'gray'} onClick={()=>{props.propertyHandler2(2)}}>Int</Button>
                    <Button color={props.propertyValue2 === 3 ? null : 'gray'} onClick={()=>{props.propertyHandler2(3)}}>Wis</Button>
                    <Button color={props.propertyValue2 === 4 ? null : 'gray'} onClick={()=>{props.propertyHandler2(4)}}>Cha</Button>
                </div>
                </div>
                <div id='applyButton'>
                <Button color={props.propertyValue2 > 0 ? null : 'gray'} disabled={props.propertyValue2 > 0 ? false : true} onClick={()=>{props.setToggleModal(props.toggleModal === 'true' ? 'false' : 'true'); props.saveHandler()}}>Create</Button></div>
            </div>
            </div>
        </Style>
        )
}

export default Modal;