import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Grid from '../Grid.js'
import GridItem from '../GridItem.js'
import GridItemStylized from '../GridItemStylized.js'
import SectionWrapper from '../SectionWrapper.js'
import * as Colors from '../../Colors.js'
import combat from '../../images/combat.svg';
import Button from '../Button.js'
import HeroPageWrapper from '../HeroPageWrapper.js'
import Row from '../Row.js'

const Column = styled.div`
  width: auto;
  display: flex; flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;

`;

const HeroCombatPage = (props) => {
  const [fortBase, setFortBase] = useState(1);
  const [reflexBase, setReflexBase] = useState(1);
  const [willBase, setWillBase] = useState(1);
  const [fortMiscMod, setFortMiscMod] = useState(3);
  const [reflexMiscMod, setReflexMiscMod] = useState(3);
  const [willMiscMod, setWillMiscMod] = useState(3);

  const [strengthScore, setStrengthScore] = useState(7);
  const [dexterityScore, setDexterityScore] = useState(16);
  const [constitutionScore, setConstitutionScore] = useState(14);
  const [intelligenceScore, setIntelligenceScore] = useState(20);
  const [wisdomScore, setWisdomScore] = useState(11);
  const [charismaScore, setCharismaScore] = useState(9);

  const [armorMod, setArmorMod] = useState(0);
  const [sizeMod, setSizeMod] = useState(1);
  const [acMiscMod, setAcMiscMod] = useState(0);

  const [baseAttackBonus, setBaseAttackBonus] = useState(2);
  const [meleeAttackMiscMod, setMeleeAttackMiscMod] = useState(0);
  const [rangedAttackMiscMod, setRangedAttackMiscMod] = useState(0);
  const [touchMiscMod, setTouchMiscMod] = useState(0);
  const [flatFootedMiscMod, setFlatFootedMiscMod] = useState(0);

  const [maxHealth, setMaxHealth] = useState(0);
  const [damageTaken, setDamageTaken] = useState(0);
  const [hitDice, setHitDice] = useState(0);

  const [initiativeMiscMod, setInitiativeMiscMod] = useState(8);
  const [speed, setSpeed] = useState(30);
  const [damageReduction, setDamageReduction] = useState(0);

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

  const handleState = (info) => {

    console.log('COMBAT HANDLE STATE CALLED')

    setEditModeEnabled(props.editModeEnabled);

    setFortBase(info.basefort || 0);
    setReflexBase(info.basereflex || 0);
    setWillBase(info.basewillmod || 0);
    setFortMiscMod(info.fortmiscmod || 0);
    setReflexMiscMod(info.reflexmiscmod || 0);
    setWillMiscMod(info.willmiscmod || 0);
    setStrengthScore(info.strength || 0);
    setDexterityScore(info.dexterity || 0);
    setConstitutionScore(info.constitution || 0);
    setIntelligenceScore(info.intelligence || 0);
    setWisdomScore(info.wisdom || 0);
    setCharismaScore(info.charisma || 0);
    setArmorMod(info.armorbonus || 0);
    setSizeMod(info.armorsizemod || 0);
    setAcMiscMod(info.armormiscmod || 0);
    setBaseAttackBonus(info.baseattackbonus || 0);
    setMeleeAttackMiscMod(info.meleemiscmod || 0);
    setRangedAttackMiscMod(info.rangedmiscmod || 0);
    setTouchMiscMod(info.touchmiscmod || 0);
    setFlatFootedMiscMod(info.flatfootedmiscmod || 0);
    setMaxHealth(info.totalhealth || 0);
    setDamageTaken(info.damagetaken || 0);
    setHitDice(info.hitdice || 0);
    setInitiativeMiscMod(info.initiativemiscmod || 0);
    setSpeed(info.movementspeed || 0);
    setDamageReduction(info.damagereduction || 0);

    //damageTaken, flatFootedMiscMod, touchMiscMod are missing from db
  };

  // Update the state of this page when the heroInfo state variable inside of CharacterSheet.js changes
   useEffect(() => {
     handleState(props.heroStats);
   }, [props.heroStats]);

  //Start the save timer when this page's state variables change
  // useEffect(()=>{ 
  //   setInitialSaveNullifier( initialSaveNullifier + 1);
  //   if (initialSaveNullifier > 2) {
  //     //setChangesDetected(true);
  //     //startSaveTimer();               
  //   }
  // }, [
  // fortBase,reflexBase,willBase,fortMiscMod,reflexMiscMod,willMiscMod,strengthScore,dexterityScore,constitutionScore,
  // intelligenceScore,wisdomScore,charismaScore,armorMod,sizeMod,acMiscMod,baseAttackBonus,meleeAttackMiscMod,rangedAttackMiscMod,
  // touchMiscMod,flatFootedMiscMod,maxHealth,damageTaken,hitDice,initiativeMiscMod,speed,damageReduction
  // ]);

  // If changes were detected update the character info in the database
  const SaveChanges = () => {
    if (changesDetected) {
      setNumberOfSaves(numberOfSaves + 1); 
      setChangesDetected(false);
      updateHeroStats();
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

  const updateHeroStats = async () => {
    console.log('INTIAITVE MISC MOD = ' + initiativeMiscMod)
    fetch("https://tabletophero.herokuapp.com/hero_stats/", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        hero_id: props.heroId,
        strength: strengthScore,
        dexterity: dexterityScore,
        constitution: constitutionScore,
        charisma: charismaScore,
        wisdom: wisdomScore,
        intelligence: intelligenceScore,
        totalhealth: maxHealth,
        damagetaken: damageTaken,
        hitdice: hitDice,
        damagereduction: damageReduction,
        baseac: 10,
        armorbonus: armorMod,
        armorsizemod: sizeMod,
        armormiscmod: acMiscMod,
        touchmiscmod: touchMiscMod,
        flatfootedmiscmod: flatFootedMiscMod,
        baseattackbonus: baseAttackBonus,
        attacksizemod: sizeMod,
        meleemiscmod: meleeAttackMiscMod,
        rangedmiscmod: rangedAttackMiscMod,
        basefort: fortBase,
        fortmiscmod: fortMiscMod,
        basereflex: reflexBase,
        reflexmiscmod: reflexMiscMod,
        basewillmod: willBase,
        willmiscmod: willMiscMod,
        initiativemiscmod: initiativeMiscMod,
        movementspeed: speed
      })
      })
      .then(response => response.json())
      .then(res => {
        props.setHeroStats(res[0])
        console.log(res[0].initiativemiscmod)
      })
  }; 


  const CleanUpModifierNumber = (n) => {
    if (n > 0) {
      return ('+' + n)
    } else
    return (n);
  }

  const GetAbilityModifier = (score) => {
  return ( Math.floor( (score - 10) / 2) );
  }

  return (
    <HeroPageWrapper color={Colors.background_superdark}>
      <h4>Combat</h4>
      <Row>
      <Grid justify='center'>

      <SectionWrapper>
        <h1>Ability Scores</h1>
        <div className='logoSpot'><img className='logoImg' src={combat}  alt='combat logo'/></div>
        <GridItemStylized derivativeLabel = 'Strength'
          derivativeValue = {CleanUpModifierNumber(GetAbilityModifier(strengthScore)) + ' (' + strengthScore + ')' }
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'strength score'
          propertyHandler1 = {setStrengthScore}
          propertyValue1 = {strengthScore}

        />
        <GridItemStylized derivativeLabel = 'Dexterity'
          derivativeValue = {CleanUpModifierNumber(GetAbilityModifier(dexterityScore)) + ' (' + dexterityScore + ')' }
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'dexterity score'
          propertyHandler1 = {setDexterityScore}
          propertyValue1 = {dexterityScore}
        />
        <GridItemStylized derivativeLabel = 'Constitution'
          derivativeValue = {CleanUpModifierNumber(GetAbilityModifier(constitutionScore)) + ' (' + constitutionScore + ')' }
          derivativeFrom = {1}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'constitution score'
          propertyHandler1 = {setConstitutionScore}
          propertyValue1 = {constitutionScore}
          editModeEnabled={editModeEnabled}
        />
        <GridItemStylized derivativeLabel = 'Intelligence'
          derivativeValue = {CleanUpModifierNumber(GetAbilityModifier(intelligenceScore)) + ' (' + intelligenceScore + ')' }
          derivativeFrom = {1}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'intelligence score'
          propertyHandler1 = {setIntelligenceScore}
          propertyValue1 = {intelligenceScore}
          editModeEnabled={editModeEnabled}
        />
        <GridItemStylized derivativeLabel = 'Wisdom'
          derivativeValue = {CleanUpModifierNumber(GetAbilityModifier(wisdomScore)) + ' (' + wisdomScore + ')' }
          derivativeFrom = {1}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'wisdom score'
          propertyHandler1 = {setWisdomScore}
          propertyValue1 = {wisdomScore}
          editModeEnabled={editModeEnabled}
        />
        <GridItemStylized derivativeLabel = 'Charisma'
          derivativeValue = {CleanUpModifierNumber(GetAbilityModifier(charismaScore)) + ' (' + charismaScore + ')' }
          derivativeFrom = {1}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'charisma score'
          propertyHandler1 = {setCharismaScore}
          propertyValue1 = {charismaScore}
          editModeEnabled={editModeEnabled}
        />
      </SectionWrapper>
      <Column>
      <SectionWrapper>
        <h1>Health</h1>
        <div className='logoSpot'><img className='logoImg' src={combat}  alt='combat logo'/></div>
        <GridItemStylized derivativeLabel = 'Max HP'

          derivativeValue = {maxHealth}
          derivativeFrom = {2}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'total HP'
          propertyHandler1 = {setMaxHealth}
          propertyValue1 = {maxHealth}

          propertyLabel2 = 'hit dice sides'
          propertyHandler2 = {setHitDice}
          propertyValue2 = {hitDice}
        />
        <GridItemStylized derivativeLabel = 'Current HP'

          derivativeValue = {maxHealth - damageTaken}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'damage taken'
          propertyHandler1 = {setDamageTaken}
          propertyValue1 = {damageTaken}
        />
        <GridItemStylized derivativeLabel = 'Damage Reduction'
          derivativeValue = {damageReduction}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'DR'
          propertyHandler1 = {setDamageReduction}
          propertyValue1 = {damageReduction}
        />
      </SectionWrapper>
        {/* armor */}
      <SectionWrapper>
        <h1>Armor</h1>
        <div className='logoSpot'><img className='logoImg' src={combat}  alt='combat logo'/></div>
        <GridItemStylized derivativeLabel = 'AC'

          derivativeValue = {10 + armorMod + GetAbilityModifier(dexterityScore) + sizeMod + acMiscMod}
          derivativeFrom = {5}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'base AC'
          propertyHandler1 = {null}
          propertyValue1 = {10}

          propertyLabel2 = 'dexterity mod'
          propertyHandler2 = {null}
          propertyValue2 = {GetAbilityModifier(dexterityScore)}

          propertyLabel4 = 'size mod'
          propertyHandler4 = {setSizeMod}
          propertyValue4 = {sizeMod}

          propertyLabel5 = 'misc mod'
          propertyHandler5 = {setAcMiscMod}
          propertyValue5 = {acMiscMod}

          propertyLabel3 = 'armor bonus'
          propertyHandler3 = {setArmorMod}
          propertyValue3 = {armorMod}
        />
        <GridItemStylized derivativeLabel = 'Touch AC'

          derivativeValue = {10 + GetAbilityModifier(dexterityScore) + sizeMod + touchMiscMod}
          derivativeFrom = {4}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'base AC'
          propertyHandler1 = {null}
          propertyValue1 = {10}

          propertyLabel2 = 'dexterity mod'
          propertyHandler2 = {null}
          propertyValue2 = {GetAbilityModifier(dexterityScore)}

          propertyLabel3 = 'size mod'
          propertyHandler3 = {setSizeMod}
          propertyValue3 = {sizeMod}

          propertyLabel4 = 'misc mod'
          propertyHandler4 = {setTouchMiscMod}
          propertyValue4 = {touchMiscMod}
        />
        <GridItemStylized derivativeLabel = 'Flat Footed AC'

          derivativeValue = {10 + armorMod + sizeMod + flatFootedMiscMod}
          derivativeFrom = {4}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'base AC'
          propertyHandler1 = {null}
          propertyValue1 = {10}

          propertyLabel2 = 'armor mod'
          propertyHandler2 = {setArmorMod}
          propertyValue2 = {armorMod}

          propertyLabel3 = 'size mod'
          propertyHandler3 = {setSizeMod}
          propertyValue3 = {sizeMod}

          propertyLabel4 = 'misc mod'
          propertyHandler4 = {setFlatFootedMiscMod}
          propertyValue4 = {flatFootedMiscMod}
        />
      </SectionWrapper>
      </Column>
      </Grid>
      <Grid justify='center'>
      <Column>
        {/* attack bonuses */}
      <SectionWrapper>
        <h1>Attack Bonuses</h1>
        <div className='logoSpot'><img className='logoImg' src={combat}  alt='combat logo'/></div>
        <GridItemStylized derivativeLabel = 'Melee'

          derivativeValue = {baseAttackBonus + GetAbilityModifier(strengthScore) + sizeMod + meleeAttackMiscMod}
          derivativeFrom = {4}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'base attack bonus'
          propertyHandler1 = {setBaseAttackBonus}
          propertyValue1 = {baseAttackBonus}

          propertyLabel2 = 'strength mod'
          propertyHandler2 = {null}
          propertyValue2 = {GetAbilityModifier(strengthScore)}

          propertyLabel3 = 'size mod'
          propertyHandler3 = {setSizeMod}
          propertyValue3 = {sizeMod}

          propertyLabel4 = 'misc mod'
          propertyHandler4 = {setMeleeAttackMiscMod}
          propertyValue4 = {meleeAttackMiscMod}
        />
        <GridItemStylized derivativeLabel = 'Ranged'

          derivativeValue = {baseAttackBonus + GetAbilityModifier(dexterityScore) + sizeMod + rangedAttackMiscMod}
          derivativeFrom = {4}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'base attack bonus'
          propertyHandler1 = {setBaseAttackBonus}
          propertyValue1 = {baseAttackBonus}

          propertyLabel2 = 'dexterity mod'
          propertyHandler2 = {null}
          propertyValue2 = {GetAbilityModifier(dexterityScore)}

          propertyLabel3 = 'size mod'
          propertyHandler3 = {setSizeMod}
          propertyValue3 = {sizeMod}

          propertyLabel4 = 'misc mod'
          propertyHandler4 = {setRangedAttackMiscMod}
          propertyValue4 = {rangedAttackMiscMod}
        />
      </SectionWrapper>
        {/* saving throws */}
      <SectionWrapper>
        <h1>Saving Throws</h1>
        <div className='logoSpot'><img className='logoImg' src={combat}  alt='combat logo'/></div>
        <GridItemStylized derivativeLabel = 'fortitude'

          derivativeValue = {fortBase + GetAbilityModifier(constitutionScore) + fortMiscMod}
          derivativeFrom = {3}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'base fort'
          propertyHandler1 = {setFortBase}
          propertyValue1 = {fortBase}

          propertyLabel2 = 'constitution mod'
          propertyHandler2 = {null}
          propertyValue2 = {GetAbilityModifier(constitutionScore)}

          propertyLabel3 = 'misc mod'
          propertyHandler3 = {setFortMiscMod}
          propertyValue3 = {fortMiscMod}
        />

        <GridItemStylized derivativeLabel = 'reflex'

          derivativeValue = {reflexBase + GetAbilityModifier(dexterityScore) + reflexMiscMod}
          derivativeFrom = {3}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'base reflex'
          propertyHandler1 = {setReflexBase}
          propertyValue1 = {reflexBase}

          propertyLabel2 = 'dexterity mod'
          propertyHandler2 = {null}
          propertyValue2 = {GetAbilityModifier(dexterityScore)}

          propertyLabel3 = 'misc mod'
          propertyHandler3 = {setReflexMiscMod}
          propertyValue3 = {reflexMiscMod}
        />

        <GridItemStylized derivativeLabel = 'will'

          derivativeValue = {willBase + GetAbilityModifier(wisdomScore) + willMiscMod}
          derivativeFrom = {3}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'base will'
          propertyHandler1 = {setWillBase}
          propertyValue1 = {willBase}

          propertyLabel2 = 'wisdom mod'
          propertyHandler2 = {null}
          propertyValue2 = {GetAbilityModifier(wisdomScore)}

          propertyLabel3 = 'misc mod'
          propertyHandler3 = {setWillMiscMod}
          propertyValue3 = {willMiscMod}
        />
      </SectionWrapper>
      </Column>
        {/* combat speed */}
        <Column>
      <SectionWrapper>
        <h1>Combat Speed</h1>
        <div className='logoSpot'><img className='logoImg' src={combat}  alt='combat logo'/></div>
        <GridItemStylized derivativeLabel = 'Initiative'

          derivativeValue = {GetAbilityModifier(dexterityScore) + initiativeMiscMod}
          derivativeFrom = {2}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'dexterity mod'
          propertyHandler1 = {null}
          propertyValue1 = {GetAbilityModifier(dexterityScore)}

          propertyLabel2 = 'misc mod'
          propertyHandler2 = {setInitiativeMiscMod}
          propertyValue2 = {initiativeMiscMod}
        />
        <GridItemStylized derivativeLabel = 'Movement Speed'

          derivativeValue = {speed}
          derivativeFrom = {1}
          editModeEnabled={editModeEnabled}
          ToggleChangesDetected={ToggleChangesDetected}

          propertyLabel1 = 'speed'
          propertyHandler1 = {setSpeed}
          propertyValue1 = {speed}
        />
      </SectionWrapper>
      </Column>
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

export default HeroCombatPage;