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

  const [changesDetected, setChangesDetected] = useState(false);

  const [initialSaveNullifier, setInitialSaveNullifier] = useState(0);
  const [numberOfSaves, setNumberOfSaves] = useState(0);
  
  const [mySaveTimer, setMySaveTimer] = useState(0);
  const saveTimerLength = 100;

  const clearSaveTimer = () => {
    console.log('cleared timer')
    clearTimeout(mySaveTimer);
  }

  // Auto saves the page after the specified length
  const startSaveTimer = () => {
    clearSaveTimer();
    setMySaveTimer( setTimeout( () => {
      SaveChanges();
    }, saveTimerLength) );
  }

  // Update the state variables to the characters info from the database
  const handleState = (info) => {
    setEditModeEnabled(props.editModeEnabled);

    setCharacterName(info.charactername || '');
    setRace(info.race || '');
    setHeroClass(info.heroclass || '');
    setLevel(info.level || 1);
    setAlignment(info.alignment || '');
    setAge(info.age || '');
    setGender(info.gender || '');
    setDeity(info.deity || '');
    setHeight(info.height || '');
    setWeight(info.weight || '');
    setEyes(info.eyes || '');
    setHair(info.hair || '');
    setLooks(info.looks || '');
    setAbout(info.about || '');
    setSize(info.size || '');
  }

  // Update the state of this page when the heroInfo state variable inside of CharacterSheet.js changes
  useEffect(() => {
      handleState(props.heroInfo);
  }, [props.heroInfo]);

  // Start the save timer when this page's state variables change
  // useEffect(()=>{ 
  //   setInitialSaveNullifier( initialSaveNullifier + 1);
  //   if (initialSaveNullifier > 2) {
  //     //detectedChanges = true;
  //     setChangesDetected(true);
  //     startSaveTimer();               
  //   }
  // }, [characterName, race, heroClass, level, alignment, age, gender, deity, height, weight, eyes, hair, looks, about]);
  // 
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
    console.log('changes detected: ' + changesDetected);
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
        hero_id: props.heroId,
        name: characterName,
        race: race,
        heroclass: heroClass,
        alignment: alignment,
        deity: deity,
        level: level,
        size: size,
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        eyes: eyes,
        hair: hair,
        looks: looks,
        about: about

      })
      })
      .then(response => response.json())
      .then(res => {
        props.setHeroInfo(res[0])
        //this may be dangerous
      })
  }; 

  return (
    <HeroPageWrapper color={Colors.background_superdark}>
      <h4>Basic Details</h4>

      <Row>
      <Grid justify='center'>
      
      <SectionWrapper color={'white'}>
        <h1>Character Info</h1>
        <div className='logoSpot'><img className='logoImg' src={combat} alt='combat logo'/></div>
        <GridItemStylized derivativeLabel = 'Character Name'
          derivativeValue = {characterName}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setCharacterName}
          propertyValue1 = {characterName}
          isNumber1= {false}

        />
        <GridItemStylized derivativeLabel = 'Class'
          derivativeValue = {heroClass}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setHeroClass}
          propertyValue1 = {heroClass}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItemStylized derivativeLabel = 'Race'
          derivativeValue = {race}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setRace}
          propertyValue1 = {race}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItemStylized derivativeLabel = 'Level'
          derivativeValue = {level}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setLevel}
          propertyValue1 = {level}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItemStylized derivativeLabel = 'Alignment'
          derivativeValue = {alignment}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setAlignment}
          propertyValue1 = {alignment}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
      </SectionWrapper>   

      <SectionWrapper color='white'>
        <h1>Description</h1>
        <div className='logoSpot'><img className='logoImg' src={combat}  alt='combat logo'/></div>
        <GridItemStylized derivativeLabel = 'About Me'
          derivativeValue = {about}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setAbout}
          propertyValue1 = {about}
          isNumber1= {false}
          isTextField1 = {true}
        />
        <GridItemStylized derivativeLabel = 'What I look Like'
          derivativeValue = {looks}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setLooks}
          propertyValue1 = {looks}
          isNumber1= {false}
          isTextField1 = {true}
        />
      </SectionWrapper>

      </Grid>     
      </Row>

      <Row>
      <Grid justify='center'>

      <SectionWrapper color='white'>
        <h1>Roleplay Info</h1>
        <div className='logoSpot'><img className='logoImg' src={combat}  alt='combat logo'/></div>
        <GridItemStylized derivativeLabel = 'Age'
          derivativeValue = {age}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setAge}
          propertyValue1 = {age}
          isNumber1= {true}
          startSaveTimer={startSaveTimer}
        />
        <GridItemStylized derivativeLabel = 'Gender'
          derivativeValue = {gender}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setGender}
          propertyValue1 = {gender}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItemStylized derivativeLabel = 'Deity'
          derivativeValue = {deity}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setDeity}
          propertyValue1 = {deity}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItemStylized derivativeLabel = 'Height'
          derivativeValue = {height}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setHeight}
          propertyValue1 = {height}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItemStylized derivativeLabel = 'Weight'
          derivativeValue = {weight}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setWeight}
          propertyValue1 = {weight}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItemStylized derivativeLabel = 'Eyes'
          derivativeValue = {eyes}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setEyes}
          propertyValue1 = {eyes}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItemStylized derivativeLabel = 'Hair'
          derivativeValue = {hair}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = {null}
          propertyHandler1 = {setHair}
          propertyValue1 = {hair}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
      </SectionWrapper>

      </Grid>
      </Row>

      <Button className='saveButton' color={changesDetected ? Colors.accent : '#A9A9A9'}
        onClick={()=>{
          setChangesDetected(true); clearSaveTimer(); SaveChanges();
          }}>
        {changesDetected ? 'save' : 'saved'}
      </Button>
      <p>auto saving {saveTimerLength / 1000} seconds after changes detected</p>

    </HeroPageWrapper>
  );
}

export default HeroDetailsPage;