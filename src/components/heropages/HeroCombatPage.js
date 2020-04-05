import React, {useState} from 'react';
import styled from 'styled-components';
import GridItem from '../GridItem.js'
import SectionWrapper from '../SectionWrapper.js'
import * as Colors from '../../Colors.js'
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
`;

const Column = styled.div`
  width: auto;

  display: flex; flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
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
    <Style>
      <h4>Combat</h4>
      <Row>
      <Grid justify='center'>
        {/* ability scores */}
      <SectionWrapper color={Colors.label_blue}>
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
        {/* health */}
      <SectionWrapper color={Colors.label_green} bgColor={Colors.background_verydark}>
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
      <SectionWrapper color={Colors.label_orange}>
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
      <SectionWrapper color={Colors.label_red}>
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
      <SectionWrapper color={Colors.label_pink}>
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
      <SectionWrapper color={Colors.label_yellow}>
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
      </Grid>

      
      </Row>
    </Style>
  );
}

export default HeroCombatPage;