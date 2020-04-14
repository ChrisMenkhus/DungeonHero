import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import * as Colors from '../Colors.js'
import HeroCombatPage from '../components/heropages/HeroCombatPage.js'
import HeroDetailsPage from '../components/heropages/HeroDetailsPage.js'
import HeroWeaponsPage from '../components/heropages/HeroWeaponsPage.js'
import HeroActionsPage from '../components/heropages/HeroActionsPage.js'

import combat from '../images/combat.svg';
import details from '../images/details.svg';
import equipment from '../images/equipment.svg';
import skills from '../images/skills.svg';


const CharacterSheet_Wrapper = styled.div` width: auto;
  min-height: 100vh;
  height: auto;
  background-color: ${Colors.background_dark};
  background-color: #0C0C0C;

  @media only screen and (max-width: 620px) {
  padding: 2rem 0px;
}
`;

const CharacterSheet_Nav = styled.div`
  z-index: 2;
  height: 3rem;
  width: 100%;
  margin: 0px auto 2rem auto;
  min-height: 2.5rem;
  background-color: ${Colors.background_verydark};  
  /*position: sticky;
  top: 0;*/
  -webkit-box-shadow: 0px 5px 11px -4px #000000; 
  box-shadow: 0px 5px 11px -4px #000000;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;


  margin-bottom: 0px;
  position: fixed;
  bottom: 0;

  .item {
     margin: auto 0.5rem 0.1rem 0.5rem;
     width: 4rem;
     display: flex; flex-direction: column;
    h1 {
      color: rgba(255,255,255,0.7);
      font-size: 0.7rem; font-weight: lighter; text-align: center;
      border-bottom: 1px solid rgba(255,255,255,0.7);
    }
  }

  img {
    fill: black !important;
    stroke: blue;
    height: 1rem; 
    width: 1rem;
    margin: auto;
    padding: 0.5rem 0.5rem 0.2rem 0.5rem;  
  }

  .active {
    h1 {
      color: white;
      border-color: white;
      border-width: 4px;
    }
    img {
      fill: ${Colors.label_blue};
    }
  }

`;

const CharacterSheet_Footer = styled.div`
  min-height: 1rem;
  display: flex;
  flex-direction: row;
  background-color: ${Colors.background_dark}; 
    opacity: 0.5;
  margin: 0px;
  margin-bottom: 0px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  -webkit-box-shadow: 0px -5px 11px -4px #000000; 
  box-shadow: 0px -5px 11px -4px #000000;
`;


const CharacterSheet = (props) => {
  const [heroInfo, setHeroInfo] = useState([]);
  const [page, setPage] = useState('details');

  const GetHeroInfo = async (heroId) => {
    console.log('03 + getInfo');
    fetch(("https://tabletophero.herokuapp.com/hero_info/" + props.heroId), {
      method: "get",
      headers: { "Content-type": "application/json" }
    })
    .then(response => response.json())
    .then(res => {
      if (res) {
        setHeroInfo(res);          
      }
    });
  };

  useEffect(() => {
    console.log('01 + useEffect on ' + props.heroId);
    GetHeroInfo(props.heroId);
  }, [props.heroId]);

  useEffect(() => {
    console.log('02 + useEffect');
    props.setHeroId(props.match.params.id)
    //GetHeroInfo(props.match.params.id);
  }, [props.match.params.id]);

  props.setRedirectPath('');

  return (
    <CharacterSheet_Wrapper>
        

        {
          page === 'actions' ? 
          <HeroActionsPage /> :
          page === 'details' ? 
          <HeroDetailsPage userId={props.userId} heroInfo={heroInfo} heroId={props.heroId} GetHeroInfo={GetHeroInfo}/> :
          page === 'combat' ? 
          <HeroCombatPage/> :
          page === 'equipment' ? 
          <HeroWeaponsPage/> :
          null
        }

        <CharacterSheet_Nav>
          <div className={page === 'actions' ? 'active item' : 'item'} onClick={()=>{ setPage('actions') }}>
            <img src={details} alt='actions page'/>
            <h1>Actions</h1>
          </div>
          <div className={page === 'details' ? 'active item' : 'item'} onClick={()=>{ setPage('details') }}>
            <img src={details} alt='details page'/>
            <h1>Details</h1>
          </div>
          <div className={page === 'combat' ? 'active item' : 'item'} onClick={()=>{ setPage('combat') }}>
            <img src={combat} alt='combat page'/>
            <h1>Combat</h1>      
          </div>
          <div className={page === 'equipment' ? 'active item' : 'item'} onClick={()=>{ setPage('equipment') }}>
            <img src={equipment} alt='equipment page'/>
            <h1>Equipment</h1>
          </div>
          <div className={page === 'skills' ? 'active item' : 'item'} onClick={()=>{ setPage('skills') }}>
            <img src={skills} alt='skills page'/>
            <h1>Skills</h1>
          </div>
        </CharacterSheet_Nav>

    </CharacterSheet_Wrapper>
  );
}

export default CharacterSheet;
