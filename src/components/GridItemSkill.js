import React, {useState, useEffect} from 'react';
import GridItemStylized from '../components/GridItemStylized'

const GridItemWeapon = (props) => {
        const {item} = props;
	const [name, setName] = useState(item.name)
        const [type, setType] = useState(item.type)
        const [ranks, setRanks] = useState(item.ranks || 0)
        const [miscBonus, setMiscBonus] = useState(item.miscbonus || 0)
        const [classSkill, setClassSkill] = useState(item.classskill || 0)
        const [abilityModBonus, setAbilityModBonus] = useState(20);
        const abilityScoreModifiers = props.abilityScoreModifiers;

        useEffect(()=>{
                console.log('type = ' + type)
        setAbilityModBonus(
                type === 0 ? abilityScoreModifiers.strength : type === 1 ? abilityScoreModifiers.dexterity :
                type === 2 ? abilityScoreModifiers.intelligence :
                type === 3 ? abilityScoreModifiers.wisdom : type === 4 ? abilityScoreModifiers.charisma : null
        )}, [type])

        const SaveSkill = async (x) => {
                console.log(item.basicitemid);
                console.log('classSkill = ' + classSkill)
                fetch("https://tabletophero.herokuapp.com/update_skill/", {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                        skillid: item.skillid,
                        name: name,
                        type: type,
                        ranks: ranks,
                        miscbonus: miscBonus,
                        classskill: classSkill
                })
                })
                .then(response => response.json())
                .then(res => {
                        console.log(res);
                })
        }

	return (
        <GridItemStylized
	derivativeLabel = {item.name}
        derivativeValue = {ranks + miscBonus + abilityModBonus + (classSkill === 1 ? ranks > 0 ? 3 : 0 : 0)}
        derivativeFrom = {6}
        editModeEnabled={props.editModeEnabled}
        ToggleChangesDetected={SaveSkill}
        showAdditionSymbols={false}
        DeleteItem={()=>{props.DeleteItem(item.skillid)}}

        propertyLabel1 = {'skill name'}
        propertyHandler1 = {setName}
        propertyValue1 = {name}
        isNumber1= {false}

        propertyLabel2 = {'class skill'}
        propertyHandler2 = {setClassSkill}
        propertyValue2 = {classSkill}
        isNumber2= {false}  
        isBoolean2 = {true}                                              

        propertyLabel3 = {'ranks'}
        propertyHandler3 = {setRanks}
        propertyValue3 = {ranks}
        isNumber3= {true}

        propertyLabel4 = {'skill ability modifier'}
        propertyHandler4 = {setType}
        propertyValue4 = {type}
        isNumber4= {true}
        isButtonOptions4 = {true}
        propertyValueSkills4={[0,1,2,3,4]}
        propertyValueSkillsLabel4={['str', 'dex', 'int', 'wis', 'cha']}

        propertyLabel5 = {''}
        propertyHandler5 = {null}
        propertyValue5 = {'+' + abilityModBonus}
        isNumber5 = {true} 

        propertyLabel6 = {'misc bonus'}
        propertyHandler6 = {setMiscBonus}
        propertyValue6 = {miscBonus}
        isNumber6 = {true} 

	/>
        )
}



export default GridItemWeapon;