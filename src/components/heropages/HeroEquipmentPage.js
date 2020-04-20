import React, {useState, useEffect} from 'react'
import Grid from '../Grid.js'
import GridItem from '../GridItem.js'
import GridItemStylized from '../GridItemStylized.js'

import GridItemInputField from '../GridItemInputField.js'
import SectionWrapper from '../SectionWrapper.js'
import * as Colors from '../../Colors.js'
import Button from '../Button.js'
import combat from '../../images/combat.svg';
import HeroPageWrapper from '../HeroPageWrapper.js'
import Column from '../Column.js'
import Row from '../Row.js'


const HeroDetailsPage = (props) => {
  // initialized state variables for this page.
  const [characterName, setCharacterName] = useState(props.heroId);
  const [race, setRace] = useState('null');
  const [heroClass, setHeroClass] = useState('null');
  const [level, setLevel] = useState('00');
  const [alignment, setAlignment] = useState('null');
  const [age, setAge] = useState(45);
  const [gender, setGender] = useState('null');
  const [deity, setDeity] = useState('null');
  const [height, setHeight] = useState('null.');
  const [weight, setWeight] = useState('null');
  const [eyes, setEyes] = useState('null');
  const [hair, setHair] = useState('null');  
  const [looks, setLooks] = useState('null');  
  const [about, setAbout] = useState('null');  
  const [size, setSize] = useState('null');

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

  }

  // Update the state of this page when the heroInfo state variable inside of CharacterSheet.js changes
  useEffect(() => {
      handleState(props.heroInfo);
  }, [props.heroInfo]);

  // If changes were detected update the character info in the database
  const SaveChanges = () => {
    if (changesDetected) {
      setNumberOfSaves(numberOfSaves + 1); 
      setChangesDetected(false);
      updateHeroInfo();
      console.log('saved 4 real')
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
  const updateHeroInfo = async () => {
    fetch("https://tabletophero.herokuapp.com/hero_info/", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({

      })
      })
      .then(response => response.json())
      .then(res => {

      })
  }; 

  return (
    <HeroPageWrapper color={Colors.background_superdark}>
      <h4>Equipment</h4>
      <Row>

      <Column>
      <Grid justify='center'>
      
      <SectionWrapper color={'white'}>
        <h1>Weapons</h1>
        <div className='logoSpot'><img className='logoImg' src={combat} alt='combat logo'/></div>
        <Button width='8rem'>create weapon</Button>
        <GridItemStylized derivativeLabel = 'Weapon Name'
          derivativeValue = {''}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {null}
          propertyValue1 = {''}
          isNumber1= {false}

        />
      </SectionWrapper>  

      </Grid>
      </Column>

      <Column>
      <h3>armor / shields</h3>
      <Button width='8rem'>create weapon</Button>
      <Grid justify='center'>
      
      <SectionWrapper color={'white'}>
        <h1>Weapon #</h1>
        <div className='logoSpot'><img className='logoImg' src={combat} alt='combat logo'/></div>
        <GridItemStylized derivativeLabel = 'Weapon Name'
          derivativeValue = {''}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {null}
          propertyValue1 = {''}
          isNumber1= {false}

        />
      </SectionWrapper>  
      </Grid>
      </Column>

      <Column>
      <h3>items</h3>
      <Button width='8rem'>create weapon</Button>
      <Grid justify='center'>
      
      <SectionWrapper color={'white'}>
        <h1>Weapon #</h1>
        <div className='logoSpot'><img className='logoImg' src={combat} alt='combat logo'/></div>
        <GridItemStylized derivativeLabel = 'Weapon Name'
          derivativeValue = {''}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {null}
          propertyValue1 = {''}
          isNumber1= {false}

        />
      </SectionWrapper>  
      </Grid>
      </Column>

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