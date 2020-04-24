import React, {useState} from 'react';
import GridItemStylized from '../components/GridItemStylized'

const GridItemWeapon = (props) => {
	const [weaponName, setWeaponName] = useState(props.item.name)
	console.log(props.item)

	return (<GridItemStylized
		derivativeLabel = {weaponName}
        derivativeValue = {''}
        derivativeFrom = {1}
        editModeEnabled={props.editModeEnabled}
        ToggleChangesDetected={props.ToggleChangesDetected}

        propertyLabel1 = {'descript'}
        propertyHandler1 = {null}
        propertyValue1 = {'jkds'}
        isNumber1= {false}
		/>)
}



export default GridItemWeapon;