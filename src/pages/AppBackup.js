import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import * as Colors from './Colors.js'
import GridItem from './components/GridItem.js'
import HeroCombatPage from './components/heropages/HeroCombatPage.js'
import HeroDetailsPage from './components/heropages/HeroDetailsPage.js'
import HeroWeaponsPage from './components/heropages/HeroWeaponsPage.js'

import Grid from './components/Grid.js'
import Navbar from './components/Navbar.js'

const CharacterSheet_Wrapper = styled.div` width: auto;
 
  /*margin: 1rem 10rem 1rem 10rem;*/
  border-radius: 1.2rem;
  min-height: 100vh;
  height: auto;
  background-color: ${Colors.background_dark};
  background-color: #0C0C0C;
 // background: linear-gradient(to bottom, ${Colors.primary} 0%, ${Colors.secondary} 100%);

  @media only screen and (max-width: 1180px) {
    /*margin: 1rem 2rem 1rem 2rem;*/
  };

  @media only screen and (max-width: 660px) {
    /*margin: 0px;*/
    /*border-radius: 0px;*/
  };
`;

const CharacterSheet_Nav = styled.div`
  z-index: 2;
  height: auto;
  width: 100%;
  margin: 0px auto 2rem auto;
  /*border-radius: 1.2rem 1.2rem 0px 0px;*/
  min-height: 2.5rem;
  background-color: ${Colors.background_verydark};  
  @media only screen and (max-width: 660px) {
    /*border-radius: 0px;*/
  };

  position: sticky;
  top: 0;

  -webkit-box-shadow: 0px 5px 11px -4px #000000; 
  box-shadow: 0px 5px 11px -4px #000000;

  display: flex;
  flex-direction: row;
  justify-content: center;

  color: white;
  .item {
     margin: auto 0.5rem 0.1rem 0.5rem;
     width: 3rem;
     display: flex; flex-direction: column;
    h1 {
      font-size: 0.5rem; font-weight: lighter; text-align: center;
      border-bottom: 1px solid white;
    }
  }
  ion-icon {
    margin: auto;
    padding: 0.5rem 0.5rem 0.2rem 0.5rem;   
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

const TestStation = styled.div`
  width: 100%;

  display: flex; flex-direction: column;
  flex-wrap: wrap;
  justify-content: top;
  text-align: center;
  input {
    width: 14rem;
    margin: auto;
    font-size: 1rem;
  }

  margin-bottom: 2rem;

  .buttons {
    margin: auto;
    display: flex; flex-direction: row;
    width: 14rem;
    button {
      width: 100%;
    }
  }
`;







const App = () => {
  const [userId, setUserId] = useState('f5223c63-957a-4bfd-96ec-c427c6301baa');
  const [name, setName] = useState('');
  const [heroId, setHeroId] = useState("c6d89efd-241d-473f-8149-d37cdb4aa42a");
  const [listOfHeroes, setListOfHeroes] = useState();
  const [heroInfo, setHeroInfo] = useState([]);


  const createHero = async () => {
    fetch("http://localhost:3000/newhero/", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        name: name
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          setHeroId(res.hero_id);
          listHeroes(userId)
          console.log('hero creation attempted')
          console.log(res);
        }
      });
  };  

  const deleteHero = async (hero_id) => {
    console.log('delete')

    fetch("http://localhost:3000/deletehero/", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        hero_id: hero_id
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          listHeroes(userId)
        }
      });
  };  

  const listHeroes = async (user_id) => {
    fetch(("http://localhost:3000/heroes/" + user_id), {
      method: "get",
      headers: { "Content-type": "application/json" }
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res) {
          console.log(res);
          if (res != 'user not valid') {
          const newList = res.map((hero)=>{
            return (<div>
              <button
              onClick={()=>{ LoadHero(hero.hero_id) } }
              > load hero {hero.name} </button> 
              <br/>
              <button
                onClick={()=>{ deleteHero(hero.hero_id) }}
                >delete hero</button>
              </div>);
          })
          setListOfHeroes(newList); }
          else { 
            console.log( 'must create a hero first' )
            setListOfHeroes();
          }
        }
      });
  };

  const LoadHero = (user_id) => {
    setHeroId(user_id);
    
  }

  const GetHeroInfo = async (heroId) => {
    fetch(("http://localhost:3000/hero_info/" + heroId), {
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
    GetHeroInfo(heroId);
  }, [heroId]);

  return (
    <div>
      <Navbar>
        <ul>
          <li>Home</li>
          <li>Heroes</li>
          <li className='right'>Logout</li>
        </ul>
      </Navbar>
      <CharacterSheet_Wrapper>
        <CharacterSheet_Nav>
          <div className='item'>
          <ion-icon name="home-outline"></ion-icon>
            <h1>Characters</h1>
          </div>
          <div className='item'>
          <ion-icon name="home-outline"></ion-icon>
            <h1>Combat</h1>
          </div>
          <div className='item'>
          <ion-icon name="home-outline"></ion-icon>
            <h1>Basic Details</h1>
          </div>
          <div className='item'>
          <ion-icon name="home-outline"></ion-icon>
            <h1>Skills</h1>
          </div>
          <div className='item'>
          <ion-icon name="home-outline"></ion-icon>
            <h1>Equipment</h1>
          </div>
        </CharacterSheet_Nav>



        <TestStation>
        <h3>test station</h3>


        <label>user id</label>
        <input value={userId} onChange={(e)=>{setUserId(e.target.value)}}></input>
        <div className='buttons'>
          <button onClick={()=>{listHeroes(userId)}}>list heroes</button>
          <button>test 2</button>
        </div>

        <div>
          {listOfHeroes}
        </div>


        <label>create hero</label>
        <input placeholder='name' onChange={(e)=>{setName(e.target.value)}}></input>
        <div className='buttons'>
          <button
            onClick={()=>{
              createHero();
             }}
            >create</button>
        </div>

        <h3>hero Id: {heroId}</h3>

        <div className='buttons'>
          <button
            onClick={()=>{LoadHero(heroId); }}
            >load hero info</button>
        </div>
        
        </TestStation>









        <HeroDetailsPage userId={userId} heroInfo={heroInfo} heroId={heroId}/>

        <HeroWeaponsPage/>
        <HeroCombatPage/>




        {/* <CharacterSheet_Footer/> */}
      </CharacterSheet_Wrapper>
    </div>
  );
}

export default App;
