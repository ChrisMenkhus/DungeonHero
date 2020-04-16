import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import GridItem from '../GridItem.js'
import SectionWrapper from '../SectionWrapper.js'
import * as Colors from '../../Colors.js'
import Button from '../Button.js'
import combat from '../../images/combat.svg';




const Style = styled.div`
  width: 100%;
  display: flex; flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 2rem;
  h4 {
    text-align: center; 
    width: 100%;
    margin: auto;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    color: white;
    font-weight: lighter;
  }

  .saveButton {
    color: white;
    font-size: 1rem;
    padding: 0.5rem; 
     

  }
`;

const Row = styled.div`
  width: auto;

  display: flex; flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  width: auto;
  justify-content: ${props => props.justify ? props.justify : 'center'};
  align-content: center;
  /*background-color: ${Colors.background_dark};*/
  margin: auto auto auto auto;
`;



const HeroDetailsPage = (props) => {
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
  const heroInfo = props.heroInfo;
  const [changesDetected, setChangesDetected] = useState();
  const [numberOfSaves, setNumberOfSaves] = useState(0);
  const [initialSaveNullifier, setInitialSaveNullifier] = useState(0);
  const [mySaveTimer, setMySaveTimer] = useState(0);
  let detectedChanges = false;
  const saveTimerLength = 9000;

  const startSaveTimer = () => {
    clearTimeout(mySaveTimer);
    console.log('timer started')
    setMySaveTimer( setTimeout( () => {
      // console.log('timer returned')
      SaveChanges();
    }, saveTimerLength) );
  }

  useEffect(()=>{ 
    setInitialSaveNullifier(initialSaveNullifier + 1);
    //console.log('initialSaveNullifier = ' + initialSaveNullifier)
    if (initialSaveNullifier > 2) {
      detectedChanges = true;
      setChangesDetected(detectedChanges);

      //console.log('changesDetected Var = ' + changesDetected)
      startSaveTimer();               
    } else {
      //console.log('Initial Save Nullified')
    }
  }, [characterName, race, heroClass, level, alignment, age, gender, deity, height, weight, eyes, hair, looks, about]);


  const handleState = (info) => {
    setCharacterName(info.charactername);
    setRace(info.race);
    setHeroClass(info.heroclass);
    setLevel(info.level);
    setAlignment(info.alignment);
    setAge(info.age);
    setGender(info.gender);
    setDeity(info.deity);
    setHeight(info.height);
    setWeight(info.weight);
    setEyes(info.eyes);
    setHair(info.hair);
    setLooks(info.looks);
    setAbout(info.about);
    setSize(info.size);
  }

  useEffect(() => {
    handleState(heroInfo);
  }, [heroInfo]);

  

  // i can have a state object instead of a bunch of variables. onEffect heroes prop being changed this state object can be updated as well. 

  const SaveChanges = () => {
    if (detectedChanges) {
      updateHeroInfo();
      setNumberOfSaves(numberOfSaves + 1);
      // console.log('NumberOfSaves IS EQUAL TO = ' + numberOfSaves);    

      detectedChanges = false; 
      setChangesDetected(detectedChanges);

      // console.log('changesDetected Var 2= ' + changesDetected)

    } else {
      // console.log('Did not save: no changes detected')
    }
  }

  const updateHeroInfo = async () => {
    console.log('UPDATING SERVER WITH HERO INFO')

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
        if (res) {
          // console.log(res);
          // props.GetHeroInfo(props.heroId);
        }
      });
  }; 

  

  return (
    <Style>
      <h4>Basic Details</h4>
      <Row>
      <Grid justify='center'>
      
        {/* ability scores */}
      <SectionWrapper color={Colors.label_red}>
        <h1>Character Info</h1>
        <div className='logoSpot'><img className='logoImg' src={combat} alt='combat logo'/></div>
        <GridItem derivativeLabel = 'Character Name'
          derivativeValue = {characterName}
          derivativeFrom = {1}

          propertyLabel1 = {null}
          propertyHandler1 = {setCharacterName}
          propertyValue1 = {characterName}
          isNumber1= {false}

          startSaveTimer={startSaveTimer}
        />
        <GridItem derivativeLabel = 'Class'
          derivativeValue = {heroClass}
          derivativeFrom = {1}

          propertyLabel1 = {null}
          propertyHandler1 = {setHeroClass}
          propertyValue1 = {heroClass}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItem derivativeLabel = 'Race'
          derivativeValue = {race}
          derivativeFrom = {1}

          propertyLabel1 = {null}
          propertyHandler1 = {setRace}
          propertyValue1 = {race}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItem derivativeLabel = 'Level'
          derivativeValue = {level}
          derivativeFrom = {1}

          propertyLabel1 = {null}
          propertyHandler1 = {setLevel}
          propertyValue1 = {level}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItem derivativeLabel = 'Alignment'
          derivativeValue = {alignment}
          derivativeFrom = {1}

          propertyLabel1 = {null}
          propertyHandler1 = {setAlignment}
          propertyValue1 = {alignment}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
      </SectionWrapper>    
      <SectionWrapper color={Colors.label_orange}>
        <h1>Roleplay Info</h1>
        <div className='logoSpot'><img className='logoImg' src={combat}  alt='combat logo'/></div>
        <GridItem derivativeLabel = 'Age'
          derivativeValue = {age}
          derivativeFrom = {1}

          propertyLabel1 = {null}
          propertyHandler1 = {setAge}
          propertyValue1 = {age}
          isNumber1= {true}
          startSaveTimer={startSaveTimer}
        />
        <GridItem derivativeLabel = 'Gender'
          derivativeValue = {gender}
          derivativeFrom = {1}

          propertyLabel1 = {null}
          propertyHandler1 = {setGender}
          propertyValue1 = {gender}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItem derivativeLabel = 'Deity'
          derivativeValue = {deity}
          derivativeFrom = {1}

          propertyLabel1 = {null}
          propertyHandler1 = {setDeity}
          propertyValue1 = {deity}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItem derivativeLabel = 'Height'
          derivativeValue = {height}
          derivativeFrom = {1}

          propertyLabel1 = {null}
          propertyHandler1 = {setHeight}
          propertyValue1 = {height}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItem derivativeLabel = 'Weight'
          derivativeValue = {weight}
          derivativeFrom = {1}

          propertyLabel1 = {null}
          propertyHandler1 = {setWeight}
          propertyValue1 = {weight}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItem derivativeLabel = 'Eyes'
          derivativeValue = {eyes}
          derivativeFrom = {1}

          propertyLabel1 = {null}
          propertyHandler1 = {setEyes}
          propertyValue1 = {eyes}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
        <GridItem derivativeLabel = 'Hair'
          derivativeValue = {hair}
          derivativeFrom = {1}

          propertyLabel1 = {null}
          propertyHandler1 = {setHair}
          propertyValue1 = {hair}
          isNumber1= {false}
          startSaveTimer={startSaveTimer}
        />
      </SectionWrapper>
        <Button className='saveButton' color={changesDetected ? Colors.label_green : '#A9A9A9'}
          onClick={()=>{SaveChanges()}} 
         >{changesDetected ? 'save' : 'saved'}</Button>
      </Grid>     
      </Row>
    </Style>
  );
}

export default HeroDetailsPage;