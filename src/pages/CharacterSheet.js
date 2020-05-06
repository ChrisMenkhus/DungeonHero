import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {background_primary, background_secondary, background_tertiary, accent, interactive} from '../Colors.js'
import HeroCombatPage from '../components/heropages/HeroCombatPage.js'
import HeroDetailsPage from '../components/heropages/HeroDetailsPage.js'
import HeroEquipmentPage from '../components/heropages/HeroEquipmentPage.js'
import HeroSkillsPage from '../components/heropages/HeroSkillsPage.js'

import HeroActionsPage from '../components/heropages/HeroActionsPage.js'
import combat from '../images/combat.svg';
import details from '../images/details.svg';
import equipment from '../images/equipment.svg';
import skills from '../images/skills.svg';


const CharacterSheetWrapper = styled.div` width: auto;
  min-height: 100vh;
 
  background-color: ${background_primary};
  @media only screen and (max-width: 620px) {
  padding: 0rem 0px;
  padding-bottom: 2rem;
  }

  .loadingicon {
  padding-top: 50vh;
  ion-icon {
  display: flex;
  margin: auto;
  animation: rotation 2s infinite linear;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  }
`;

const CharacterSheetNav = styled.div`
  z-index: 102;
  height: 3rem;
  width: 100%;
  margin: 0px auto 2rem auto;
  min-height: 2.5rem;
  background-color: ${interactive};  
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
   
    }
  }
`;




const CharacterSheet = (props) => {
  const [heroInfo, setHeroInfo] = useState([]);
  const [heroStats, setHeroStats] = useState([]);
  const [heroEquipment, setHeroEquipment] = useState([]);
  const [heroSkills, setHeroSkills] = useState([]);

  const [isLoading, setIsLoading] = useState(false);



  const [page, setPage] = useState('details');
  const paramsId = props.match.params.id;
  const mainHeroId = props.heroId;

  const [editModeEnabled, setEditModeEnabled] = useState(props.loggedIn);
  //const [editModeEnabled, setEditModeEnabled] = useState(true);


  useEffect(()=>{

      setEditModeEnabled(props.loggedIn);
      
    
  }, [props.loggedIn])

  useEffect(() => {
  window.scrollTo(0, 0)
  }, [])

  const switchPages = (newPage) => {
    window.scrollTo(0, 0)

    if (page === 'details') {
      // setSwitchingDetailsPage(true);

      setPage(newPage);
    } else if (page === 'combat') {
      // setSwitchingCombatPage(true);

      setPage(newPage);
    } else if (page === 'equipment') {
      // setSwitchingEquipmentPage(true);

      setPage(newPage);
    } else if (page === 'skills') {
      // setSwitchingSkillsPage(true);

      setPage(newPage);
    }

    
  }

  useEffect(() => {
    setIsLoading(true);
    const GetHeroInfo = async (heroId) => {
      fetch(("https://tabletophero.herokuapp.com/hero_info/" + heroId), {
        method: "get",
        headers: { "Content-type": "application/json" }
      })
      .then(response => response.json())
      .then(res => {
        setIsLoading(false);
        if (res) {
          setHeroInfo(res);          
        }
      })
      .catch(error => console.log(error));
    };

    const GetHeroStats = async (heroId) => {
      fetch(("https://tabletophero.herokuapp.com/hero_stats/" + heroId), {
        method: "get",
        headers: { "Content-type": "application/json" }
      })
      .then(response => response.json())
      .then(res => {
        setIsLoading(false);
        if (res) {
          setHeroStats(res);          
        }
      })
      .catch(error => console.log(error));
    };

    const GetHeroEquipment = async (heroId) => {
      fetch(("https://tabletophero.herokuapp.com/hero_equipment/" + heroId), {
        method: "get",
        headers: { "Content-type": "application/json" }
      })
      .then(response => response.json())
      .then(res => {
        setIsLoading(false);
        if (res) {
          setHeroEquipment(res);          
        }
      })
      .catch(error => console.log(error));
    };

    const GetHeroSkills = async (heroId) => {
      fetch(("https://tabletophero.herokuapp.com/hero_skills/" + heroId), {
        method: "get",
        headers: { "Content-type": "application/json" }
      })
      .then(response => response.json())
      .then(res => {
        setIsLoading(false);
        if (res) {
          setHeroSkills(res);          
        }
      })
      .catch(error => console.log(error));
    };

    if (mainHeroId.length > 1) {
    GetHeroInfo(mainHeroId);
    GetHeroStats(mainHeroId);  
    GetHeroEquipment(mainHeroId);
    GetHeroSkills(mainHeroId);
    }
  }, [mainHeroId]);

   useEffect(() => {
      if (mainHeroId === '') {
        props.setHeroId(paramsId);     
        // ^^ giving me that error 
        //setEditModeEnabled(false);
      }
   }, [paramsId]);

  props.setRedirectPath('');

  return (
    <CharacterSheetWrapper>
      {isLoading ? 
      <div className='loadingicon'>
        <ion-icon name="reload-outline"/>
      </div>
      :
      <div>
        {
          page === 'actions' ? 
          <HeroActionsPage /> :
          page === 'details' ? 
          <HeroDetailsPage editModeEnabled={editModeEnabled} userId={props.userId} heroInfo={heroInfo} setHeroInfo={setHeroInfo} heroId={props.heroId}/> 
          :
          page === 'combat' ? 
          <HeroCombatPage editModeEnabled={editModeEnabled} userId={props.userId} heroStats={heroStats} setHeroStats={setHeroStats} heroId={props.heroId}/> :
          page === 'equipment' ? 
          <HeroEquipmentPage editModeEnabled={editModeEnabled} userId={props.userId} heroEquipment={heroEquipment} setHeroEquipment={setHeroEquipment} heroId={props.heroId}/> :
          page === 'skills' ? 
          <HeroSkillsPage editModeEnabled={editModeEnabled} userId={props.userId} heroStats={heroStats} heroSkills={heroSkills} setHeroSkills={setHeroSkills} heroId={props.heroId}/> :
          null
        } 
      </div>
      }

        <CharacterSheetNav>
          {/* <div className={page === 'actions' ? 'active item' : 'item'} onClick={()=>{ setSwitchingPage(true); setPage('actions');  }}> */}
          {/*   <img src={details} alt='actions page'/> */}
          {/*   <h1>Actions</h1> */}
          {/* </div> */}
          <div className={page === 'details' ? 'active item' : 'item'} onClick={()=>{ switchPages('details') }}>
            <img src={details} alt='details page'/>
            <h1>Details</h1>
          </div>
          <div className={page === 'combat' ? 'active item' : 'item'} onClick={()=>{ switchPages('combat') }}>
            <img src={combat} alt='combat page'/>
            <h1>Combat</h1>      
          </div>
          <div className={page === 'equipment' ? 'active item' : 'item'} onClick={()=>{ switchPages('equipment') }}>
            <img src={equipment} alt='equipment page'/>
            <h1>Equipment</h1>
          </div>
          <div className={page === 'skills' ? 'active item' : 'item'} onClick={()=>{ switchPages('skills') }}>
            <img src={skills} alt='skills page'/>
            <h1>Skills</h1>
          </div>
        </CharacterSheetNav>

    </CharacterSheetWrapper>
  );
}

export default CharacterSheet;
