import React, {useState} from 'react';
import styled from 'styled-components';
import * as Colors from '../Colors.js'
import Input from './Input.js'
import TextField from './TextField.js'
import Button from './Button.js'


const Style = styled.div`
	background-color: ${Colors.background_secondary};
	margin: 0.2rem 0.5rem;
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
			color: white;
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
	}
	#applyButton {
		display: flex;
		margin: 0.5rem 0.5rem 0.1rem;
		button {
			
		}
	}

`;

const GridItemStylized = (props) => {
  	const [collapsed, toggleCollapsed] = useState(false);
  	const [editModeEnabled, setEditModeEnabled] = useState(props.editModeEnabled);
  	const [editMode, toggleEditMode] = useState(false);

  	const derivativeFrom = props.derivativeFrom;

	const keyPress = (e) => {
	    if(e.keyCode === 13){
	       //toggleCollapsed(false);
	       //props.ToggleChangesDetected(true);
	    }
	}

	return(
	<Style>
		<div id='header'>
        	<h2>{props.derivativeLabel}</h2>
        	<div id='buttons' color={editMode ? 'gray' : null}>
        		{editModeEnabled && !editMode ?
        	<ion-icon name="pencil-outline" onClick={()=>{toggleCollapsed(true); toggleEditMode(true)}}/> : null }
        		{derivativeFrom > 0 && (String(props.derivativeValue).length > 0 && props.derivativeValue !== 0) ? 
        	<ion-icon name={!collapsed ? 'chevron-down-outline' : 'chevron-up-outline' }
        		onClick={()=>{toggleCollapsed(!collapsed); toggleEditMode(false); if (editMode) { props.ToggleChangesDetected(true) } }}/> : null }
        	</div>
      	</div>
      	{!collapsed ? 
      		// Display when not editing or not viewing derivatives
      	<div id='content'>
        	<h3>{props.derivativeValue}</h3>     		
      	</div> :
      		// display content in edit mode
      	<div id='content'> 
      		<div>
	        	<h5>{props.derivativeLabel}</h5>
	            <h3>{props.derivativeFrom > 1 ? props.derivativeValue : null}</h3>
	            <h3>=</h3>
            </div>
      		<div>
	        	<h5>{props.propertyLabel1}</h5>
	        	{props.propertyHandler1 && editMode ? 
	        		!props.isTextField1 ?
	        	<Input value={props.propertyValue1} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler1(OnInputChange(e.target.value, props.isNumber1));}} 
	            /> :
				<TextField value={props.propertyValue1} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler1(OnInputChange(e.target.value, props.isNumber1));}} 
	            /> : 
	            <h3>{props.propertyValue1}</h3>}
            </div>
            {props.derivativeFrom > 1 ? 
            <div>
	            <h3>+</h3> 
	            <h5>{props.propertyLabel2}</h5>
	        	{props.propertyHandler2 && editMode ? 
	        	<Input value={props.propertyValue2} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler2(OnInputChange(e.target.value, props.isNumber2));}} 
	            /> : <h3>{props.propertyValue2}</h3>}	
            </div>
            : null} 
            {props.derivativeFrom > 2 ? 
            <div>
	            <h3>+</h3> 
	            <h5>{props.propertyLabel3}</h5>
	        	{props.propertyHandler3 && editMode ? 
	        	<Input value={props.propertyValue3} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler3(OnInputChange(e.target.value, props.isNumber3));}} 
	            /> : <h3>{props.propertyValue3}</h3>}	
            </div>
            : null}
            {editMode ?  		
	      	<div id='applyButton'>
	      		<Button onClick={()=>{
	      			toggleCollapsed(false); 
	      			toggleEditMode(false);
	      			props.ToggleChangesDetected(true);
	      			}}>
	      			okay
	      		</Button>
	      	</div> : null }
      	</div> 
      	}
	</Style>
	)
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



export default GridItemStylized;