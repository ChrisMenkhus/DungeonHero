import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import * as Colors from '../Colors.js'

const Style = styled.div`
  height: 100vh;
  background-color: ${Colors.background_superdark};
  width: 100%;
  display: flex; flex-direction: column;
  flex-wrap: wrap;
  justify-content: top;
  text-align: center;

  display: flex; flex-direction: column;

  justify-content: center;  align-content: center;

  input {
    width: 14rem;
    margin: auto;
    font-size: 1rem;
  }

  .buttons {
    margin: auto;
    display: flex; flex-direction: row;
    width: 14rem;
    button {
      width: 100%;
    }
  }

  .heroList {
    margin-bottom: 5rem;
    margin-left: auto; margin-right: auto;
    padding: 0.5rem 1rem;
    width: fit-content;
    background-color: ${Colors.label_red};   

    h3 {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  }

  .heroItem {
    background-color: transparent;
    display: flex;
    width: 10rem;
    border-bottom: 1px solid white;
    margin: 0px; padding: 0px;

    input {
        width: 100%; background-color: transparent; border: none;
        color: white;
        font-size: 0.8rem;
        font-weight: lighter;
        text-indent: 7px;
        margin-top: auto;
        margin-bottom: 3px;
      }

    h4 {
      margin: 0px; padding: 0px;
      width: auto;
      display: inline-block;
      margin-right: 12px;
      font-size: 0.8rem;
      font-weight: lighter;
      text-indent: 7px;
      margin-top: auto;
      margin-bottom: 3px;
    }
    .itemButtons {
      margin-left: auto;
      button {
        padding: 3px;
        margin: 4px;
        height: auto;
        width: auto;
        background-color: white;
        border: none;
        border-right: 1px sold black;
      }

      ion-icon {
        display: relative;

        height: 0.8rem; width: 0.8rem;
        margin: auto;
        margin-top: 0.3rem;
      }


    }
  }
`;

const Heroes = (props) => {
  const [name, setName] = useState('');
  const [listOfHeroes, setListOfHeroes] = useState();
  const [newHeroToggled, setNewHeroToggled] = useState();
  const [deleteHeroToggled, setdeleteHeroToggled] = useState();
  const [heroSetToDelete, setHeroSetToDelete] = useState();
  const [heroNameSetToDelete, setHeroNameSetToDelete] = useState();

  const [confirmText, setConfirmText] = useState('');


  const createHero = async () => {
    fetch("https://tabletophero.herokuapp.com/newhero/", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user_id: props.userId,
        name: name
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          LoadHero(res[0].hero_id);
          listHeroes(props.userId)
          console.log('hero creation attempted')
          console.log(res);
        }
      });
  };  

  const deleteHero = async (hero_id) => {
    console.log('delete')

    fetch("https://tabletophero.herokuapp.com/deletehero/", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        hero_id: hero_id
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          listHeroes(props.userId)
        }
      });
  };  

  const listHeroes = async (user_id) => {
    fetch(("https://tabletophero.herokuapp.com/heroes/" + user_id), {
      method: "get",
      headers: { "Content-type": "application/json" }
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res) {
          console.log(res);
          if (res !== 'user not valid') {
          const newList = res.map((hero)=>{

            return (
              <div key={hero.hero_id} className='heroItem'>
              <h4>{hero.name}</h4>
              <div className='itemButtons'>
              <ion-icon name="enter-outline" onClick={()=>{ LoadHero(hero.hero_id) } }/>       
              <ion-icon name="trash-outline" onClick={()=>{ 
                // deleteHero(hero.hero_id) 
                setHeroNameSetToDelete(hero.name);
                setHeroSetToDelete(hero.hero_id);
                setdeleteHeroToggled(true);
                }}/>
              </div>
              </div>
              );

          })
          setListOfHeroes(newList); }
          else { 
            console.log( 'must create a hero first' )
            setListOfHeroes();
          }
        }
      });
  };

  const LoadHero = (hero_id) => {
    props.setHeroId(hero_id);
    props.setRedirectPath('/charactersheet')
    console.log('load attempted')
  }

  useEffect(() => {
    listHeroes(props.userId);
  }, [props.userId]);

  const keyPress = (e) => {
    if(e.keyCode === 13){
      if (newHeroToggled) {
       createHero(); setNewHeroToggled(false)
      } else if (deleteHeroToggled) {
        if (confirmText === 'confirm')
          deleteHero(heroSetToDelete);
          setdeleteHeroToggled(false);
      }
    }
  }

  return (
    <div>
      <Style>
        {props.loggedIn ? 
        <div className='heroList'>
          <h3>Characters</h3>
          {deleteHeroToggled ? null :
          <div className='heroItem' onClick={()=>{setNewHeroToggled(true)}}>
            <h4>{newHeroToggled ? 'enter character name' : 'new character'}</h4>
            <div className='itemButtons'>
              {newHeroToggled ? null :
            <ion-icon name="add-circle-outline" onClick={()=>{setNewHeroToggled(true)}}/>
             }
            </div>
          </div>
          }
          {newHeroToggled ? 
          <div className='heroItem'>
            <input placeholder='character name' onChange={(e)=>{setName(e.target.value)}} 
              onKeyDown={(e)=>{keyPress(e)}}
             />
            <div className='itemButtons'>
            <ion-icon name="add-circle-outline" onClick={()=>{createHero(); setNewHeroToggled(false)}}/>
            </div>
          </div>
          : null
          }
          {deleteHeroToggled ? 
          <div className='heroItem'>
            <h4>Enter 'confirm' to delete character {heroNameSetToDelete}</h4>
            <div className='itemButtons'>
            
            </div>
          </div> : null }

          {deleteHeroToggled ? 
          <div className='heroItem'>
            <input placeholder='confirm' onChange={(e)=>{setConfirmText(e.target.value)}} 
              onKeyDown={(e)=>{keyPress(e)}}
             />
            <div className='itemButtons'>
            <ion-icon name="trash-outline" onClick={()=>{ 
              if (confirmText === 'confirm')
              deleteHero(heroSetToDelete);
              setdeleteHeroToggled(false);
               }}/>
            </div>
          </div>
          : null
          }
          {newHeroToggled ? null : deleteHeroToggled ? null : listOfHeroes}
        </div>
        : 'Login to view heroes' }
      </Style>
    </div>
  );
}

export default Heroes;
