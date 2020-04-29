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
			background-color: transparent;
			border: none;
			height: 0.6rem; width: 0.6rem;
			padding: 0.1rem;	
			/*filter: brightness(0) saturate(100%) invert(20%) sepia(99%) saturate(4043%) hue-rotate(340deg) brightness(110%) contrast(109%);*/
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
			width: 100%;
			overflow-x: hidden;
			user-select: text;
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

		.buttonoptions-content {
			
			width: 80%;
	        display: flex;
	        flex-direction: row; 
	        margin: auto;
	        button {
	            width: 100%;
	            margin: auto;
	        }
		}
		ion-icon {
			display: flex;
			margin: auto;
		}
	}
	#applyButton {
		display: flex;
		margin: 0.2rem 0.5rem 0.1rem;
		button {
			
		}
	}
	#deleteButton {
		display: flex;
		margin: 0.5rem 0.5rem 0px;
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
	            {props.showAdditionSymbols === false ? null : <h3>=</h3>}
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
	            {props.showAdditionSymbols === false ? null : <h3>+</h3>}
	            <h5>{props.propertyLabel2}</h5>
	        	{props.propertyHandler2 && editMode ? 
	        	props.isBoolean2 ?
	        	<ion-icon name={props.propertyValue2 === 1 ? 'radio-button-on-outline' : 'radio-button-off-outline' } 
	        	onClick={()=>{props.propertyHandler2(props.propertyValue2 === 0 ? 1 : 0)}}
	            />	  
	        	:
	        	<Input value={props.propertyValue2} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler2(OnInputChange(e.target.value, props.isNumber2));}} 
	            /> : <h3>{props.isBoolean2 === undefined ? props.propertyValue2 : props.isBoolean2 ? 'Yes' : 'no'}</h3>}	
            </div>
            : null} 
            {props.derivativeFrom > 2 ? 
            <div>
	            {props.showAdditionSymbols === false ? null : <h3>+</h3>} 
	            <h5>{props.propertyLabel3}</h5>
	        	{props.propertyHandler3 && editMode ? 
	        	<Input value={props.propertyValue3 || ''} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler3(OnInputChange(e.target.value, props.isNumber3));}} 
	            /> : <h3>{props.propertyValue3}</h3>}	
            </div>
            : null}
            {props.derivativeFrom > 3 ? 
            <div>
	            {props.showAdditionSymbols === false ? null : <h3>+</h3>} 
	            <h5>{props.propertyLabel4}</h5>
	        	{props.propertyHandler4 && editMode ? 
	        	!props.isButtonOptions4 ?
	        	<Input value={props.propertyValue4} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler4(OnInputChange(e.target.value, props.isNumber4));}} 
	            /> : 
	            

	            <div className='buttonoptions-content'>
                    <Button color={props.propertyValue4 === props.propertyValueSkills4[0] ? null : 'gray'} onClick={()=>{props.propertyHandler4(props.propertyValueSkills4[0])}}>{props.propertyValueSkillsLabel4[0]}</Button>
                    <Button color={props.propertyValue4 === props.propertyValueSkills4[1] ? null : 'gray'} onClick={()=>{props.propertyHandler4(props.propertyValueSkills4[1])}}>{props.propertyValueSkillsLabel4[1]}</Button>
                    <Button color={props.propertyValue4 === props.propertyValueSkills4[2] ? null : 'gray'} onClick={()=>{props.propertyHandler4(props.propertyValueSkills4[2])}}>{props.propertyValueSkillsLabel4[2]}</Button>
                    <Button color={props.propertyValue4 === props.propertyValueSkills4[3] ? null : 'gray'} onClick={()=>{props.propertyHandler4(props.propertyValueSkills4[3])}}>{props.propertyValueSkillsLabel4[3]}</Button>
                    <Button color={props.propertyValue4 === props.propertyValueSkills4[4] ? null : 'gray'} onClick={()=>{props.propertyHandler4(props.propertyValueSkills4[4])}}>{props.propertyValueSkillsLabel4[4]}</Button>
                </div>


	            : <h3>{!props.isButtonOptions4 ? props.propertyValue4 : props.propertyValueSkillsLabel4[props.propertyValue4]}</h3>}	
            </div>
            : null}
            {props.derivativeFrom > 4 ? 
            <div>
	            {props.showAdditionSymbols === false ? null : <h3>+</h3>} 
	            <h5>{props.propertyLabel5}</h5>
	        	{props.propertyHandler5 && editMode ? 
	        	<Input value={props.propertyValue5} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler5(OnInputChange(e.target.value, props.isNumber5));}} 
	            /> : <h3>{props.propertyValue5}</h3>}	
            </div>
            : null}
            {props.derivativeFrom > 5 ? 
            <div>
	            {props.showAdditionSymbols === false ? null : <h3>+</h3>} 
	            <h5>{props.propertyLabel6}</h5>
	        	{props.propertyHandler6 && editMode ? 
	        	<Input value={props.propertyValue6} 	        	
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler6(OnInputChange(e.target.value, props.isNumber6));}} 
	            /> : <h3>{props.propertyValue6}</h3>}	
            </div>
            : null}
            {props.derivativeFrom > 6 ? 
            <div>
	            {props.showAdditionSymbols === false ? null : <h3>+</h3>} 
	            <h5>{props.propertyLabel7}</h5>
	        	{props.propertyHandler7 && editMode ? 
	        	<Input value={props.propertyValue7} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler7(OnInputChange(e.target.value, props.isNumber7));}} 
	            /> : <h3>{props.propertyValue7}</h3>}	
            </div>
            : null}
            {props.derivativeFrom > 7 ? 
            <div>
	            {props.showAdditionSymbols === false ? null : <h3>+</h3>} 
	            <h5>{props.propertyLabel8}</h5>
	        	{props.propertyHandler8 && editMode ? 
	        	<Input value={props.propertyValue8} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler8(OnInputChange(e.target.value, props.isNumber8));}} 
	            /> : <h3>{props.propertyValue8}</h3>}	
            </div>
            : null}
            {props.derivativeFrom > 8 ? 
            <div>
	            {props.showAdditionSymbols === false ? null : <h3>+</h3>} 
	            <h5>{props.propertyLabel9}</h5>
	        	{props.propertyHandler9 && editMode ? 
	        	<Input value={props.propertyValue9} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler9(OnInputChange(e.target.value, props.isNumber9));}} 
	            /> : <h3>{props.propertyValue9}</h3>}	
            </div>
            : null}
            {props.derivativeFrom > 9 ? 
            <div>
	            {props.showAdditionSymbols === false ? null : <h3>+</h3>} 
	            <h5>{props.propertyLabel10}</h5>
	        	{props.propertyHandler10 && editMode ? 
	        	<Input value={props.propertyValue10} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler10(OnInputChange(e.target.value, props.isNumber10));}} 
	            /> : <h3>{props.propertyValue10}</h3>}	
            </div>
            : null}
            {props.derivativeFrom > 10 ? 
            <div>
	            {props.showAdditionSymbols === false ? null : <h3>+</h3>} 
	            <h5>{props.propertyLabel11}</h5>
	        	{props.propertyHandler11 && editMode ? 
	        	<Input value={props.propertyValue11} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler11(OnInputChange(e.target.value, props.isNumber11));}} 
	            /> : <h3>{props.propertyValue11}</h3>}	
            </div>
            : null}
            {props.derivativeFrom > 11 ? 
            <div>
	            {props.showAdditionSymbols === false ? null : <h3>+</h3>} 
	            <h5>{props.propertyLabel12}</h5>
	        	{props.propertyHandler12 && editMode ? 
	        	<Input value={props.propertyValue12} 
	            onKeyDown={(e)=>{keyPress(e, toggleCollapsed)}}
	            onChange={(e)=>{ props.propertyHandler12(OnInputChange(e.target.value, props.isNumber12));}} 
	            /> : <h3>{props.propertyValue12}</h3>}	
            </div>
            : null}                                                                                                         

			{editMode && props.DeleteItem ?  		
	      	<div id='deleteButton'>
	      		<Button color={Colors.accent} onClick={()=>{
	      				props.DeleteItem();
	      			}}>
	      			delete
	      		</Button>
	      	</div> : null }

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