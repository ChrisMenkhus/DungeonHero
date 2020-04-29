import React, {useState} from 'react';
import GridItemStylized from '../components/GridItemStylized'

const GridItemWeapon = (props) => {
        const {item} = props;
	const [name, setName] = useState(item.name)
        const [description, setDescription] = useState(item.description)
        const [source, setSource] = useState(item.source)
        const [amount, setAmount] = useState(item.amount)



        const SaveBasicItem = async (x) => {
                console.log(item.basicitemid);
                fetch("https://tabletophero.herokuapp.com/update_basicitem/", {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                        itemid: item.basicitemid,
                        name: name,
                        description: description,
                        amount: amount,
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
        derivativeValue = {amount !== null ? 'x' + amount : ''}
        derivativeFrom = {5}
        editModeEnabled={props.editModeEnabled}
        ToggleChangesDetected={SaveBasicItem}
        showAdditionSymbols={false}
        DeleteItem={()=>{props.DeleteItem(item.basicitemid, 3)}}

        propertyLabel1 = {'item name'}
        propertyHandler1 = {setName}
        propertyValue1 = {name}
        isNumber1= {false}

        propertyLabel2 = {'description'}
        propertyHandler2 = {setDescription}
        propertyValue2 = {description}
        isNumber2= {false}

        propertyLabel3 = {'amount'}
        propertyHandler3 = {setAmount}
        propertyValue3 = {amount}
        isNumber3= {true}

        propertyLabel4 = {'source'}
        propertyHandler4 = {setSource}
        propertyValue4 = {source}
        isNumber4= {false}                                               
	/>
        )
}



export default GridItemWeapon;