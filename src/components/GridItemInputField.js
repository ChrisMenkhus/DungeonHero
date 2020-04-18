import React, {useState} from 'react';
import styled from 'styled-components';
import * as Colors from '../Colors.js'
import Button from '../components/Button.js'

const Container = styled.div`
    margin: 0.2rem;
    margin-bottom: 0px;
    width: auto;
    min-width: 8rem;
    min-height: 12.1rem;
    height: auto;
    background-color: ${'#1B1E1C'};

    h2 {
      font-size: 0.6rem;
      text-align: center;
      font-weight: lighter;
    }

    h3 {
      font-size: 1rem;
      text-align: center;   
      font-weight: lighter; 
    }

    .collapseButton {
      height: 0.5rem;
      width: 100%;
      background-color: ${Colors.primary};
    }
    .properties {
      /*border: 0.5px solid ${Colors.secondary};*/
      display: flex;
      flex-direction: column;
      padding-top: 0rem;
    }
`;


const InputField = styled.textarea`
    display: flex;
    width: 100%;
    min-width: 1rem;
    font-size: 1rem;
    margin: 0rem auto 0.5rem auto;
    background-color: #E3E3E3;
    border: none;
    color: black;
    text-align: center;
    font-weight: lighter;
    min-height: 11rem;
    height: 100%;
    resize: none;
    overflow: hidden;

    &:focus {
      /*box-shadow: 0 0 5px white;*/
      /*border: 1px solid white;*/
    }
  `;

const GridItem = (props) => {
  const [collapsed, toggleCollapsed] = useState(true);
  return (
    <Container>
      <div className='derivative' onClick={()=>{toggleCollapsed(!collapsed)}}>
        <h2>{props.derivativeLabel}</h2>
        
      </div>
      {collapsed ? 
        <div>
        <h3 onClick={()=>{toggleCollapsed(!collapsed)}}>

          {props.derivativeValue === null ? 'An epic Knight...' : props.derivativeValue }

        </h3>
        </div>
        :
        <div className='properties'>
          <div>
            <h2>{props.propertyLabel1}</h2>
              { props.propertyHandler1 ? 
              <InputField 
                placeholder='An epic Knight...'
                value={props.propertyValue1} 
                onChange={(e)=>{props.propertyHandler1(OnInputChange(e.target.value, props.isNumber1) );}} 
                />
              : 
              <h3>{props.propertyValue1}</h3> 
              }  
          </div> 
          <Button onClick={()=>{toggleCollapsed(!collapsed)}}>cool</Button>  
          {props.children ? props.children : null}
        </div>
      }         
    </Container>
  );
}



const OnInputChange = (t, isNumber=null) => {
  let myString = t.replace(/\D/g,'');

  if (isNumber || isNumber === null) {
    return Number(myString);
  }  
  else {
    return(t);
  }
}




export default GridItem;