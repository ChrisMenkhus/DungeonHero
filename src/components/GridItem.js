import React, {useState} from 'react';
import styled from 'styled-components';
import * as Colors from '../Colors.js'
import Input from './Input.js'

const Container = styled.div`
    margin: 0.2rem;

    width: auto;
    min-width: 8rem;
    /*min-height: 5rem;*/
    height: 100%;
    background-color: ${'#1B1E1C'};

    h2 {
      font-size: 0.6rem;
      text-align: center;
      font-weight: lighter;
    }

    h3 {
      font-size: 1rem;
      text-align: center;    
    }

    .derivative {
      /*border: 0.5px solid #2B2B2B;*/
    }

    .collapseButton {
      height: 0.5rem;
      width: 100%;
      background-color: ${Colors.primary};
    }
    .properties {
      border: 0.5px solid ${Colors.secondary};

      display: flex;
      flex-direction: column;
      /*border-bottom: 1px solid ${Colors.primary};*/
      padding-top: 0.8rem;
    }
`;



const GridItem = (props) => {
  const [collapsed, toggleCollapsed] = useState(true);
  return (
    <Container>
      <div className='derivative' onClick={()=>{toggleCollapsed(!collapsed)}}>
        <h2>{props.derivativeLabel}</h2>
        <h3>{props.derivativeValue}</h3>
      </div>
      {collapsed ?
        null
        :
        <div className='properties'>
          { DisplayProperties(props, toggleCollapsed) }
          
          {props.children}
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

const keyPress = (e, toggleCollapsed) => {
    if(e.keyCode === 13){
       toggleCollapsed(true);
    }
}



const DisplayProperties = (props, toggleCollapsed) => {
  const derivativeFrom = props.derivativeFrom;
  return (
  <div>
    {derivativeFrom > 0 ?
      <div>
        <h2>{props.propertyLabel1}</h2>
        { props.propertyHandler1 ? 
          <Input value={props.propertyValue1} 

            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}

            onChange={(e)=>{
              props.propertyHandler1(
                OnInputChange(e.target.value, props.isNumber1) 
              ); 
            }} 

            />
          : <h3>{props.propertyValue1}</h3> }    
      </div> 
    : null }
    {derivativeFrom > 1 ?
      <div>
        <h2>{props.propertyLabel2}</h2>
        { props.propertyHandler2 ? 
          <Input value={props.propertyValue2} onChange={(e)=>
            {
            props.propertyHandler2(OnInputChange(e.target.value, props.isNumber2));
            }} />
          : <h3>{props.propertyValue2}</h3> }  
      </div> 
    : null }
    {derivativeFrom > 2 ?
      <div>
        <h2>{props.propertyLabel3}</h2>
        { props.propertyHandler3 ? 
          <Input value={props.propertyValue3} 
            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
            onChange={(e)=>{props.propertyHandler3(
              OnInputChange(e.target.value, props.isNumber3)           
            ) }} />
          : <h3>{props.propertyValue3}</h3> }  
      </div> 
    : null }
    {derivativeFrom > 3 ?
      <div>
        <h2>{props.propertyLabel4}</h2>
        { props.propertyHandler4 ? 
          <Input value={props.propertyValue4} 
            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
            onChange={(e)=>{props.propertyHandler4(
              OnInputChange(e.target.value, props.isNumber4)
            )}} />
          : <h3>{props.propertyValue4}</h3> }  
      </div> 
    : null }
    {derivativeFrom > 4 ?
      <div>
        <h2>{props.propertyLabel5}</h2>
        { props.propertyHandler5 ? 
          <Input value={props.propertyValue5} 
            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
            onChange={(e)=>{props.propertyHandler5(
              OnInputChange(e.target.value, props.isNumber5)
            )}} />
          : <h3>{props.propertyValue5}</h3> }  
      </div> 
    : null }
    {derivativeFrom > 5 ?
      <div>
        <h2>{props.propertyLabel6}</h2>
        { props.propertyHandler6 ? 
          <Input value={props.propertyValue6} 
            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
            onChange={(e)=>{props.propertyHandler6(
              OnInputChange(e.target.value, props.isNumber6)
            )}} />
          : <h3>{props.propertyValue6}</h3> }  
      </div> 
    : null }
    {derivativeFrom > 6 ?
      <div>
        <h2>{props.propertyLabel7}</h2>
        { props.propertyHandler7 ? 
          <Input value={props.propertyValue7} 
            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
            onChange={(e)=>{props.propertyHandler7(
              OnInputChange(e.target.value, props.isNumber7)
            )}} />
          : <h3>{props.propertyValue7}</h3> }  
      </div> 
    : null }
    {derivativeFrom > 7 ?
      <div>
        <h2>{props.propertyLabel8}</h2>
        { props.propertyHandler8 ? 
          <Input value={props.propertyValue8} 
            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
            onChange={(e)=>{props.propertyHandler8(
              OnInputChange(e.target.value, props.isNumber8)
            )}} />
          : <h3>{props.propertyValue7}</h3> }  
      </div> 
    : null }
    {derivativeFrom > 8 ?
      <div>
        <h2>{props.propertyLabel9}</h2>
        { props.propertyHandler9 ? 
          <Input value={props.propertyValue9} 
            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
            onChange={(e)=>{props.propertyHandler9(
              OnInputChange(e.target.value, props.isNumber9)
            )}} />
          : <h3>{props.propertyValue9}</h3> }  
      </div> 
    : null }
  </div>
  )  
}



export default GridItem;