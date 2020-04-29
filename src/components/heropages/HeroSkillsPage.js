import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

import Grid from '../Grid.js'
import GridItem from '../GridItem.js'
import GridItemStylized from '../GridItemStylized.js'
import GridItemWeapon from '../GridItemWeapon.js'
import GridItemArmor from '../GridItemArmor.js'
import GridItemBasicItem from '../GridItemBasicItem.js'
import GridItemSkill from '../GridItemSkill.js'



import GridItemInputField from '../GridItemInputField.js'
import SectionWrapper from '../SectionWrapper.js'
import * as Colors from '../../Colors.js'
import Button from '../Button.js'
import combat from '../../images/combat.svg';
import HeroPageWrapper from '../HeroPageWrapper.js'
import Column from '../Column.js'
import Row from '../Row.js'
import ModalSkills from '../ModalSkills.js'


const HeroSkillsPage = (props) => {
  // initialized state variables for this page.
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillType, setNewSkillType] = useState(0);
  const [skills, setSkills] = useState();
  const [toggleModal, setToggleModal] = useState('false');
  const [editModeEnabled, setEditModeEnabled] = useState(props.editModeEnabled);



  // Reference to the characters info from the database.
  const [heroInfo, setHeroInfo] = useState();

  const [changesDetected, setChangesDetected] = useState();

  const [initialSaveNullifier, setInitialSaveNullifier] = useState(0);
  const [numberOfSaves, setNumberOfSaves] = useState(0);
  
  const [mySaveTimer, setMySaveTimer] = useState(0);
  const saveTimerLength = 100;

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
    let skillsArray = [];

    let abilityScoreModifiers =  {
        strength: Math.floor( ( props.heroStats.strength - 10) / 2),
        dexterity: Math.floor( ( props.heroStats.dexterity - 10) / 2),
        constitution: Math.floor( ( props.heroStats.constitution - 10) / 2),
        intelligence: Math.floor( ( props.heroStats.intelligence - 10) / 2),
        wisdom: Math.floor( ( props.heroStats.wisdom - 10) / 2),
        charisma: Math.floor( ( props.heroStats.charisma - 10) / 2),
    } 

    if (info) {
    if (info.length)
    skillsArray = info.map((item, i)=>{
      return(
        <GridItemSkill 
          key={i+Math.random()*10}
          item={item}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}
          DeleteItem={DeleteSkill}
          abilityScoreModifiers={abilityScoreModifiers}
          />
        )
    })
    }

    setSkills(skillsArray);
  }

  const DeleteSkill = async (skillid) => {
    fetch("https://tabletophero.herokuapp.com/delete_skill/", {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
            heroid: props.heroId,
            skillid: skillid
    })
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      props.setHeroSkills(res);
    })
  }


  // Update the state of this page when the heroInfo state variable inside of CharacterSheet.js changes
  useEffect(() => {
      handleState(props.heroSkills);
  }, [props.heroSkills, props.heroStats]);

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
  const SaveNewSkill = async () => {
    fetch("https://tabletophero.herokuapp.com/newskill/", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: newSkillName,
        heroid: props.heroId,
        type: newSkillType
      })
      })
      .then(response => response.json())
      .then(res => {
        console.log('save new skill response:')
        console.log(res);
        props.setHeroSkills(res);
      })
  }; 

  return (
    <HeroPageWrapper color={Colors.background_superdark}>
      <ModalSkills setToggleModal={setToggleModal} toggleModal={toggleModal}
        modalTitle='Add Skill'
        propertyValueName1='skill name'
        propertyHandler1={setNewSkillName}

        propertyValueName2='skill ability modifier'
        propertyValue2={newSkillType}
        propertyHandler2={setNewSkillType}

        saveHandler={SaveNewSkill}
        >
        
      </ModalSkills>
      <h4>Skills</h4>
      <Column>
        <Button width='8rem'
        onClick={()=>{setToggleModal(toggleModal === 'true' ? 'false' : 'true')}}
        >Add Skills</Button>
      </Column>
      <Row>
      <div>
      <Grid justify='center'>
      
      <SectionWrapper color={'white'}>
        <h1>Skills</h1>
        <div className='logoSpot'><img className='logoImg' src={combat} alt='combat logo'/></div>
        {skills}
      </SectionWrapper>  

      </Grid>
      </div>

      </Row>
    </HeroPageWrapper>
  );
}

export default HeroSkillsPage;