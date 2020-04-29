import React, {useState} from 'react';
import GridItemStylized from '../components/GridItemStylized'

const GridItemWeapon = (props) => {
        const {item} = props;
	const [name, setName] = useState(item.name)
        const [description, setDescription] = useState(item.description)
        const [type, setType] = useState(item.type)
        const [acbonus, setAcBonus] = useState(item.acbonus)
        const [maxDex, setMaxDex] = useState(item.maxdex)
        const [armorCheckPenalty, setArmorCheckPenalty] = useState(item.armorcheckpenalty)
        const [spellFailure, setSpellFailure] = useState(item.spellfailure)
        const [speed, setSpeed] = useState(item.speed)
        const [source, setSource] = useState(item.source)



        const SaveArmor = async (x) => {
                console.log(item.armorid);
                fetch("https://tabletophero.herokuapp.com/update_armor/", {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                        itemid: item.armorid,
                        description: description,
                        type: type,
                        acbonus: acbonus,
                        maxdex: maxDex,
                        armorcheckpenalty: armorCheckPenalty,
                        spellfailure: spellFailure,
                        speed: speed,
                        source: source                
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
        derivativeValue = {description || (acbonus ? '+' : '') +  (acbonus || '')} 
        derivativeFrom = {9}
        editModeEnabled={props.editModeEnabled}
        ToggleChangesDetected={SaveArmor}
        showAdditionSymbols={false}
        DeleteItem={()=>{props.DeleteItem(item.armorid, 2)}}

        propertyLabel1 = {'armor name'}
        propertyHandler1 = {setName}
        propertyValue1 = {name}
        isNumber1= {false}

        propertyLabel2 = {'description'}
        propertyHandler2 = {setDescription}
        propertyValue2 = {description}
        isNumber2= {false}

        propertyLabel3 = {'ac bonus'}
        propertyHandler3 = {setAcBonus}
        propertyValue3 = {acbonus}
        isNumber3= {true}

        propertyLabel4 = {'max dex'}
        propertyHandler4 = {setMaxDex}
        propertyValue4 = {maxDex}
        isNumber4= {true}

        propertyLabel5 = {'armor check penalty'}
        propertyHandler5 = {setArmorCheckPenalty}
        propertyValue5 = {armorCheckPenalty}
        isNumber5= {true}

        propertyLabel6 = {'spell failure chance'}
        propertyHandler6 = {setSpellFailure}
        propertyValue6 = {spellFailure}
        isNumber6= {true}

        propertyLabel7 = {'max movement speed'}
        propertyHandler7 = {setSpeed}
        propertyValue7 = {speed}
        isNumber7= {true}

        propertyLabel8 = {'source'}
        propertyHandler8 = {setSource}
        propertyValue8 = {source}
        isNumber8= {false}                                         
	/>
        )
}



export default GridItemWeapon;