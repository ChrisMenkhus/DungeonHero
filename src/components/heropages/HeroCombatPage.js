import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Grid from '../Grid.js'
import GridItem from '../GridItem.js'
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

  const handleState = (info) => {

    console.log('COMBAT HANDLE STATE CALLED')

    setFortBase(info.basefort);
    setReflexBase(info.basereflex);
    setWillBase(info.basewillmod);
    setFortMiscMod(info.fortmiscmod);
    setReflexMiscMod(info.reflexmiscmod);
    setWillMiscMod(info.willmiscmod);
    setStrengthScore(info.strength);
    setDexterityScore(info.dexterity);
    setConstitutionScore(info.constitution);
    setIntelligenceScore(info.intelligence);
    setWisdomScore(info.wisdom);
    setCharismaScore(info.charisma);
    setArmorMod(info.armorbonus);
    setSizeMod(info.armorsizemod);
    setAcMiscMod(info.armormiscmod);
    setBaseAttackBonus(baseAttackBonus);
    setMeleeAttackMiscMod(info.meleemiscmod);
    setRangedAttackMiscMod(info.rangedmiscmod);
    setTouchMiscMod(info.touchmiscmod);
    setFlatFootedMiscMod(info.flatfootedmiscmod);
    setMaxHealth(info.totalhealth);
    setDamageTaken(info.damagetaken);
    setHitDice(info.hitdice);
    setInitiativeMiscMod(info.initiativemiscmod);
    setSpeed(info.movementspeed);
    setDamageReduction(info.damagereduction);

    //damageTaken, flatFootedMiscMod, touchMiscMod are missing from db
  };

  // Update the state of this page when the heroInfo state variable inside of CharacterSheet.js changes
   useEffect(() => {
     handleState(props.heroStats);
   }, [props.heroStats]);

  //Start the save timer when this page's state variables change
  useEffect(()=>{ 
    setInitialSaveNullifier( initialSaveNullifier + 1);
    if (initialSaveNullifier > 2) {
      setChangesDetected(true);
      startSaveTimer();               
    }
  }, [
  fortBase,reflexBase,willBase,fortMiscMod,reflexMiscMod,willMiscMod,strengthScore,dexterityScore,constitutionScore,
  intelligenceScore,wisdomScore,charismaScore,armorMod,sizeMod,acMiscMod,baseAttackBonus,meleeAttackMiscMod,rangedAttackMiscMod,
  touchMiscMod,flatFootedMiscMod,maxHealth,damageTaken,hitDice,initiativeMiscMod,speed,damageReduction
  ]);

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

  const updateHeroStats = async () => {
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
        baseac: 0,
        armorbonus: armorMod,
        armorsizemod: 0,
        armormiscmod: acMiscMod,
        touchmiscmod: touchMiscMod,
        flatfootedmiscmod: flatFootedMiscMod,
        baseattackbonus: baseAttackBonus,
        attacksizemod: 0,
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
        <GridItem derivativeLabel = 'Strength'
          derivativeValue = {CleanUpModifierNumber(GetAbilityModifier(strengthScore))}
          derivativeFrom = {1}

          propertyLabel1 = 'strength score'
          propertyHandler1 = {setStrengthScore}
          propertyValue1 = {strengthScore}
        />
        <GridItem derivativeLabel = 'Dexterity'
          derivativeValue = {CleanUpModifierNumber(GetAbilityModifier(dexterityScore))}
          derivativeFrom = {1}

          propertyLabel1 = 'dexterity score'
          propertyHandler1 = {setDexterityScore}
          propertyValue1 = {dexterityScore}
        />
        <GridItem derivativeLabel = 'Constitution'
          derivativeValue = {CleanUpModifierNumber(GetAbilityModifier(constitutionScore))}
          derivativeFrom = {1}

          propertyLabel1 = 'constitution score'
          propertyHandler1 = {setConstitutionScore}
          propertyValue1 = {constitutionScore}
        />
        <GridItem derivativeLabel = 'Intelligence'
          derivativeValue = {CleanUpModifierNumber(GetAbilityModifier(intelligenceScore))}
          derivativeFrom = {1}

          propertyLabel1 = 'intelligence score'
          propertyHandler1 = {setIntelligenceScore}
          propertyValue1 = {intelligenceScore}
        />
        <GridItem derivativeLabel = 'Wisdom'
          derivativeValue = {CleanUpModifierNumber(GetAbilityModifier(wisdomScore))}
          derivativeFrom = {1}

          propertyLabel1 = 'wisdom score'
          propertyHandler1 = {setWisdomScore}
          propertyValue1 = {wisdomScore}
        />
        <GridItem derivativeLabel = 'Charisma'
          derivativeValue = {CleanUpModifierNumber(GetAbilityModifier(charismaScore))}
          derivativeFrom = {1}

          propertyLabel1 = 'charisma score'
          propertyHandler1 = {setCharismaScore}
          propertyValue1 = {charismaScore}
        />
      </SectionWrapper>
      <Column>
      <SectionWrapper>
        <h1>Health</h1>
        <div className='logoSpot'><img className='logoImg' src={combat}  alt='combat logo'/></div>
        <GridItem derivativeLabel = 'Max HP'

          derivativeValue = {maxHealth}
          derivativeFrom = {2}

          propertyLabel1 = 'total HP'
          propertyHandler1 = {setMaxHealth}
          propertyValue1 = {maxHealth}

          propertyLabel2 = 'hit dice sides'
          propertyHandler2 = {setHitDice}
          propertyValue2 = {hitDice}
        />
        <GridItem derivativeLabel = 'Current HP'

          derivativeValue = {maxHealth - damageTaken}
          derivativeFrom = {1}

          propertyLabel1 = 'damage taken'
          propertyHandler1 = {setDamageTaken}
          propertyValue1 = {damageTaken}
        />
        <GridItem derivativeLabel = 'Damage Reduction'
          derivativeValue = {damageReduction}
          derivativeFrom = {1}

          propertyLabel1 = 'DR'
          propertyHandler1 = {setDamageReduction}
          propertyValue1 = {damageReduction}
        />
      </SectionWrapper>
        {/* armor */}
      <SectionWrapper>
        <h1>Armor</h1>
        <div className='logoSpot'><img className='logoImg' src={combat}  alt='combat logo'/></div>
        <GridItem derivativeLabel = 'AC'

          derivativeValue = {10 + armorMod + GetAbilityModifier(dexterityScore) + sizeMod + acMiscMod}
          derivativeFrom = {5}

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
        <GridItem derivativeLabel = 'Touch AC'

          derivativeValue = {10 + GetAbilityModifier(dexterityScore) + sizeMod + touchMiscMod}
          derivativeFrom = {4}

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
        <GridItem derivativeLabel = 'Flat Footed AC'

          derivativeValue = {10 + armorMod + sizeMod + flatFootedMiscMod}
          derivativeFrom = {4}

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
        <GridItem derivativeLabel = 'Melee'

          derivativeValue = {baseAttackBonus + GetAbilityModifier(strengthScore) + sizeMod + meleeAttackMiscMod}
          derivativeFrom = {4}

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
        <GridItem derivativeLabel = 'Ranged'

          derivativeValue = {baseAttackBonus + GetAbilityModifier(dexterityScore) + sizeMod + rangedAttackMiscMod}
          derivativeFrom = {4}

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
        <GridItem derivativeLabel = 'fortitude'

          derivativeValue = {fortBase + GetAbilityModifier(constitutionScore) + fortMiscMod}
          derivativeFrom = {3}

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

        <GridItem derivativeLabel = 'reflex'

          derivativeValue = {reflexBase + GetAbilityModifier(dexterityScore) + reflexMiscMod}
          derivativeFrom = {3}

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

        <GridItem derivativeLabel = 'will'

          derivativeValue = {willBase + GetAbilityModifier(wisdomScore) + willMiscMod}
          derivativeFrom = {3}

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
        <GridItem derivativeLabel = 'Initiative'

          derivativeValue = {GetAbilityModifier(dexterityScore) + initiativeMiscMod}
          derivativeFrom = {2}

          propertyLabel1 = 'dexterity mod'
          propertyHandler1 = {null}
          propertyValue1 = {GetAbilityModifier(dexterityScore)}

          propertyLabel2 = 'misc mod'
          propertyHandler2 = {setInitiativeMiscMod}
          propertyValue2 = {initiativeMiscMod}
        />
        <GridItem derivativeLabel = 'Movement Speed'

          derivativeValue = {speed}
          derivativeFrom = {1}

          propertyLabel1 = 'speed'
          propertyHandler1 = {setSpeed}
          propertyValue1 = {speed}
        />
      </SectionWrapper>
      </Column>
      </Grid>
      </Row>

      <Button className='saveButton' color={changesDetected ? Colors.secondary : '#A9A9A9'}
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