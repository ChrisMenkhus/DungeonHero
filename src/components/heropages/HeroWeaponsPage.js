import React, {useState} from 'react';
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

  .topButtons {
    display: flex;
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



const GridItemWeapon = () => {

  const [weaponName, setWeaponName] = useState('Thunderfury');
  const [damageDice, setDamageDice] = useState('1d4');
  const [critRange, setCritRange] = useState('20x2');
  const [attackRange, setAttackRange] = useState('5ft');
  const [weight, setWeight] = useState('5lbs');
  const [size, setSize] = useState('medium');
  const [damageType, setDamageType] = useState('piercing');
  const [ammunition, setAmmunition] = useState('none');
  const [special, setSpecial] = useState('Frost')

  return (
    <GridItem derivativeLabel = 'weapon 1'
          derivativeValue = {weaponName}
          derivativeFrom = {9}

          propertyLabel1 = 'name'
          propertyHandler1 = {setWeaponName}
          propertyValue1 = {weaponName}
          isNumber1= {false}

          propertyLabel2 = 'damage dice'
          propertyHandler2 = {setDamageDice}
          propertyValue2 = {damageDice}
          isNumber2 = {false}

          propertyLabel3 = 'critical range & multiplier'
          propertyHandler3 = {setCritRange}
          propertyValue3 = {critRange}
          isNumber3 = {false}

          propertyLabel4 = 'attack range'
          propertyHandler4 = {setAttackRange}
          propertyValue4 = {attackRange}
          isNumber4 = {false}         

          propertyLabel5 = 'weapon weight'
          propertyHandler5 = {setWeight}
          propertyValue5 = {weight}
          isNumber5 = {false}        

          propertyLabel6 = 'weapon size'
          propertyHandler6 = {setSize}
          propertyValue6 = {size}
          isNumber6 = {false}         

          propertyLabel7 = 'damage type'
          propertyHandler7 = {setDamageType}
          propertyValue7 = {damageType}
          isNumber7 = {false}         

          propertyLabel8 = 'ammunition'
          propertyHandler8 = {setAmmunition}
          propertyValue8 = {ammunition}

          propertyLabel9 = 'special properties'
          propertyHandler9 = {setSpecial}
          propertyValue9 = {special}
          isNumber9 = {false}         

        >
        <Button color={Colors.label_red}>delete weapon</Button> 
        <Button color={Colors.label_green}>save weapon</Button>   
    </GridItem> 
  )
}

const HeroWeaponsPage = (props) => {
  return (
    <Style>
      <h4>Equipment</h4>

      <Row>
      <Grid justify='center'>       
      <SectionWrapper color={Colors.label_red}>
        <h1>Weapons</h1>
        <div className='logoSpot'><img className='logoImg' src={combat} alt='logo'/></div>
        
        <div className='topButtons'>
          <Button>new weapon</Button>
        </div>

        <GridItemWeapon/>
        <GridItemWeapon/>
        <GridItemWeapon/>


      </SectionWrapper>
      </Grid>     
      </Row>
    </Style>
  );
}

export default HeroWeaponsPage;