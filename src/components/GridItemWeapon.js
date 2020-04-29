import React, {useState} from 'react';
import GridItemStylized from '../components/GridItemStylized'

const GridItemWeapon = (props) => {
        const {item} = props;
	const [name, setName] = useState(item.name)
        const [description, setDescription] = useState(item.description)
        const [damageDieSides, setDamageDieSides] = useState(item.damagediesides)
        const [damageDiceAmount, setDamageDiceAmount] = useState(item.damagediceamount)
        const [damageBonus, setDamageBonus] = useState(item.damagebonus)
        const [criticalMultiplier, setCriticalMultiplier] = useState(item.criticalmultiplier)
        const [criticalRangeFrom, setCriticalRangeFrom] = useState(item.criticalrangefrom)
        const [criticalRangeTo, setCriticalRangeTo] = useState(item.criticalrangeto)
        const [range, setRange] = useState(item.range)
        const [specialProperties, setSpecialProperties] = useState(item.specialproperties)
        const [source, setSource] = useState(item.source)

        const SaveWeapon = async (x) => {
                console.log(item.weaponid);
                fetch("https://tabletophero.herokuapp.com/update_weapon/", {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                        itemid: item.weaponid,
                        name: name,
                        description: description,
                        damagediesides: damageDieSides,
                        damagediceamount: damageDiceAmount,
                        damagebonus: damageBonus,
                        criticalmultiplier: criticalMultiplier,
                        criticalrangefrom: criticalRangeFrom,
                        criticalrangeto: criticalRangeTo,
                        range: range,
                        specialproperties: specialProperties,
                        source: source
                })
                })
                .then(response => response.json())
                .then(res => {
                        console.log(res);
                })
        }

        const derivativeString1 = damageDiceAmount !== null ? damageDiceAmount + 'd' : '';
        const derivativeString2 = damageDieSides !== null ? damageDieSides + ' ' : '';
        const derivativeString3 = damageBonus !== null ? '+' + damageBonus : '';


	return (
        <GridItemStylized
	derivativeLabel = {item.name}
        derivativeValue = {derivativeString1 + derivativeString2 + derivativeString3}
        derivativeFrom = {11}
        editModeEnabled={props.editModeEnabled}
        ToggleChangesDetected={SaveWeapon}
        showAdditionSymbols={false}
        DeleteItem={()=>{props.DeleteItem(item.weaponid, 1)}}

        propertyLabel1 = {'weapon name'}
        propertyHandler1 = {setName}
        propertyValue1 = {name}
        isNumber1= {false}

        propertyLabel2 = {'description'}
        propertyHandler2 = {setDescription}
        propertyValue2 = {description}
        isNumber2= {false}

        propertyLabel3 = {'damage dice amount'}
        propertyHandler3 = {setDamageDiceAmount}
        propertyValue3 = {damageDiceAmount}
        isNumber3= {true}

        propertyLabel4 = {'damage die sides'}
        propertyHandler4 = {setDamageDieSides}
        propertyValue4 = {damageDieSides}
        isNumber4= {true}
        isButtonOptions4 = {true}
        propertyValueSkills4={[4,6,8,10,12]}
        propertyValueSkillsLabel4={['4', '6', '8', '10', '12']}

        propertyLabel5 = {'damage bonus'}
        propertyHandler5 = {setDamageBonus}
        propertyValue5 = {damageBonus}
        isNumber5= {true}

        propertyLabel6 = {'critical multiplier'}
        propertyHandler6 = {setCriticalMultiplier}
        propertyValue6 = {criticalMultiplier}
        isNumber6= {true}

        propertyLabel7 = {'critical range from'}
        propertyHandler7 = {setCriticalRangeFrom}
        propertyValue7 = {criticalRangeFrom}
        isNumber7= {true}

        propertyLabel8 = {'critical range to'}
        propertyHandler8 = {setCriticalRangeTo}
        propertyValue8 = {criticalRangeTo}
        isNumber8= {true}

        propertyLabel9 = {'range'}
        propertyHandler9 = {setRange}
        propertyValue9 = {range}
        isNumber9= {true}

        propertyLabel10 = {'special properties'}
        propertyHandler10 = {setSpecialProperties}
        propertyValue10 = {specialProperties}
        isNumber10= {false}

        propertyLabel11 = {'source'}
        propertyHandler11 = {setSource}
        propertyValue11 = {source}
        isNumber11= {false}                                               
	/>
        )
}



export default GridItemWeapon;