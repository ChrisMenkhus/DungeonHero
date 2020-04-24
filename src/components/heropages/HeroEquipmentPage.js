import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

import Grid from '../Grid.js'
import GridItem from '../GridItem.js'
import GridItemStylized from '../GridItemStylized.js'
import GridItemWeapon from '../GridItemWeapon.js'

import GridItemInputField from '../GridItemInputField.js'
import SectionWrapper from '../SectionWrapper.js'
import * as Colors from '../../Colors.js'
import Button from '../Button.js'
import combat from '../../images/combat.svg';
import HeroPageWrapper from '../HeroPageWrapper.js'
import Column from '../Column.js'
import Row from '../Row.js'
import Modal from '../Modal.js'


const HeroDetailsPage = (props) => {
  // initialized state variables for this page.
  const [newWeaponName, setNewWeaponName] = useState('');
  const [newWeaponType, setNewWeaponType] = useState(0);

  const [weaponItems, setWeaponItems] = useState();
  const [armorItems, setArmorItems] = useState();
  const [basicItems, setBasicItems] = useState();



  const [toggleModal, setToggleModal] = useState(false);

  const [editModeEnabled, setEditModeEnabled] = useState(props.editModeEnabled);

  // Reference to the characters info from the database.
  const [heroInfo, setHeroInfo] = useState();

  const [changesDetected, setChangesDetected] = useState();

  const [initialSaveNullifier, setInitialSaveNullifier] = useState(0);
  const [numberOfSaves, setNumberOfSaves] = useState(0);
  
  const [mySaveTimer, setMySaveTimer] = useState(0);
  const saveTimerLength = 9000;

  const clearSaveTimer = () => {
    clearTimeout(mySaveTimer);
  }

  // Auto saves the page after the specified length
  const startSaveTimer = () => {
    clearTimeout(mySaveTimer);
    setMySaveTimer( setTimeout( () => {
      SaveChanges();
    }, saveTimerLength) );
  }

  // Update the state variables to the characters info from the database
  const handleState = (info) => {
    setEditModeEnabled(props.editModeEnabled);

    let weaponArray = [];
    let armorArray = [];
    let basicItemsArray = [];


    if (info.length) {
    if(info[0].length) weaponArray = info[0].map((item, i)=>{
      return(
        <GridItemWeapon item = {item}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}
          />
        )
    })
    if(info[1].length) armorArray = info[1].map((item, i)=>{
      return(
        <GridItemWeapon item = {item}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}
          />
        )
    })
    if(info[2].length) basicItemsArray = info[2].map((item, i)=>{
      return(
        <GridItemWeapon item = {item}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}
          />
        )
    })

    }

    setWeaponItems(weaponArray);
    setArmorItems(armorArray);
    setBasicItems(basicItemsArray);

  }



  // Update the state of this page when the heroInfo state variable inside of CharacterSheet.js changes
  useEffect(() => {
      handleState(props.heroEquipment);
  }, [props.heroEquipment]);

  // If changes were detected update the character info in the database
  const SaveChanges = () => {
    if (changesDetected) {
      setNumberOfSaves(numberOfSaves + 1); 
      setChangesDetected(false);     
    } else {
      console.log('Did not save: no changes detected')
    }
  }

  const ToggleChangesDetected = (x) => {
    setChangesDetected(x ? x : !changesDetected);
  }

  useEffect(() => {
      if (changesDetected)
      startSaveTimer(); 
   }, [changesDetected]);

  // save the page's state variables to the database
  const SaveNewItem = async () => {
    console.log('tryin new item')
    fetch("http://localhost:5000/newitem/", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: newWeaponName,
        heroid: props.heroId,
        type: newWeaponType
      })
      })
      .then(response => response.json())
      .then(res => {
        console.log('save new item response:')
        console.log(res);
        //props.setHeroEquipment(res);
      })
  }; 

  return (
    <HeroPageWrapper color={Colors.background_superdark}>
      <Modal setToggleModal={setToggleModal} toggleModal={toggleModal}
        modalTitle='Add Equipment'
        propertyValueName1='equipment name'
        propertyHandler1={setNewWeaponName}

        propertyValueName2='equipment type'
        propertyValue2={newWeaponType}
        propertyHandler2={setNewWeaponType}

        saveHandler={SaveNewItem}
        >
        

      </Modal>
      <h4>Equipment</h4>
      <Column>
              <Button width='8rem'
        onClick={()=>{setToggleModal(!toggleModal)}}
        >Add Equipment</Button>
      </Column>
      <Row>
      <div>
      <Grid justify='center'>
      
      <SectionWrapper color={'white'}>
        <h1>Weapons</h1>
        <div className='logoSpot'><img className='logoImg' src={combat} alt='combat logo'/></div>
        {weaponItems}
      </SectionWrapper>  

      </Grid>
      </div>

      <div>
      <Grid justify='center'>
      
      <SectionWrapper color={'white'}>
        <h1>Armor / Shields</h1>
        <div className='logoSpot'><img className='logoImg' src={combat} alt='combat logo'/></div>
        {armorItems}
      </SectionWrapper>  

      </Grid>
      </div>

      <div>
      <Grid justify='center'>
      
      <SectionWrapper color={'white'}>
        <h1>Items</h1>
        <div className='logoSpot'><img className='logoImg' src={combat} alt='combat logo'/></div>
        {basicItems}
      </SectionWrapper>  

      </Grid>
      </div>

      </Row>

      {/* <Button className='saveButton' color={changesDetected ? Colors.secondary : '#A9A9A9'} */}
      {/*   onClick={()=>{ */}
      {/*     setChangesDetected(true); clearSaveTimer(); SaveChanges(); */}
      {/*     }}> */}
      {/*   {changesDetected ? 'save' : 'saved'} */}
      {/* </Button> */}
      {/* <p>auto saving {saveTimerLength / 1000} seconds after changes detected</p> */}

    </HeroPageWrapper>
  );
}

export default HeroDetailsPage;