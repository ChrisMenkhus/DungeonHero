import React, {useState} from 'react';
import styled from 'styled-components';
import Media from 'react-media';
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import Navbar from './components/Navbar.js'
import NavbarMobile from './components/NavbarMobile.js'
import CharacterSheet from './pages/CharacterSheet.js'
import Heroes from './pages/Heroes.js'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import * as Colors from './Colors.js'

import Test from './pages/Test.js'



const Style = styled.div`
  display: flex; 
  flex-direction: column;

  .nav-icon {
    position: fixed;
    z-index: 99;
    margin: 1em;
    width: 30px;
    background-color: ${Colors.interactive};
    border-radius: 50%;
    padding: 0.5rem;
  }
  .nav-icon:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  .nav-icon:after, 
  .nav-icon:before, 
  .nav-icon div {
    background-color: #fff;
    border-radius: 3px;
    content: '';
    display: block;
    height: 5px;
    margin: 3px 0;
    transition: all .2s ease-in-out;
  }
`;

const NavStyle = styled.div`
  z-index: 3;

  .myTitle {

    
    font-weight: bolder;
  }
  
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  margin: 0px 5px;
  color: #EAEAEA;
  &:hover { 
  color: white; 
  }

  .title {
    color: ${Colors.secondary};
  }

  .active {
    color: purple;
  }

`;

const Nav = (props) => {
  const [navToggled, setNavToggled] = useState(false);
  return (
    <NavStyle>
      <Media query={{ maxWidth: 620 }} 
        render={ ()=>(
          <div className={navToggled ? 'toggled nav-icon' : 'nav-icon'} onClick={()=>{setNavToggled(!navToggled)}}>
            <div/>
          </div> 
        )}
      />
      <Media query={{ maxWidth: 620 }} 
        render={ ()=>(
          <NavbarMobile navToggled={navToggled}>
            <ul>
            <li className='navItem title'>
              <StyledLink exact to='/' onClick={()=>{setNavToggled(false); props.setRedirectPath('')}}>
              TableTopHero</StyledLink>
            </li>
            {/* <li className='navItem'> */}
            {/*   <StyledLink to='/' activeClassName='active' onClick={()=>{setNavToggled(false)}}> */}
            {/*   Home</StyledLink> */}
            {/* </li> */}
            {props.loggedIn ? 
            <li className='navItem'>
              <StyledLink exact to='/heroes' activeClassName='active' onClick={()=>{setNavToggled(false); props.setRedirectPath('')}}>
              Heroes</StyledLink>
            </li> :
            <li className='navItem'>
              <StyledLink exact to='/register' activeClassName='active' onClick={()=>{setNavToggled(false); props.setRedirectPath('')}}>
              Register</StyledLink> 
            </li> }
            <li className='navItem'>
              <StyledLink exact to='/login' activeClassName='active' onClick={()=>{setNavToggled(false); props.setLoggedIn(false); props.setRedirectPath('/home')}}>
              {props.loggedIn ? 'Logout' : 'Login'}</StyledLink>
            </li>
            </ul>
          </NavbarMobile>
        )}
      />
      <Media query={{ minWidth: 620 }} 
        render={ ()=>(
          <Navbar loggedIn={props.loggedIn}>
            <ul>
            <li className='navItem title'>
              <StyledLink exact to='/' onClick={()=>{setNavToggled(false); props.setRedirectPath('')}}>
              <span className='myTitle'>TableTopHero</span></StyledLink>
            </li>
            {/* <li className='navItem'> */}
            {/*   <StyledLink exact to='/' activeClassName='active' onClick={()=>{setNavToggled(false); props.setRedirectPath('')}}> */}
            {/*   Home</StyledLink> */}
            {/* </li> */}
            {props.loggedIn ? 
            <li className='navItem'>
              <StyledLink exact activeClassName='active' to='/heroes' onClick={()=>{setNavToggled(false); props.setRedirectPath('')}}>
              Heroes</StyledLink>
            </li>
              : null }
            
            {/* <li className='navItem'> */}
            {/*   <StyledLink to='/register' activeClassName='active' onClick={()=>{setNavToggled(false); props.setRedirectPath('')}}> */}
            {/*   Register</StyledLink>  */}
            {/* </li>  */}
            <li className='navItem right'>
              <StyledLink exact activeClassName='active' to='/login' onClick={()=>{setNavToggled(false); props.setLoggedIn(false); props.setRedirectPath('/home') }}>
              {props.loggedIn ? 'Logout' : 'Login'}</StyledLink>
            </li>
            </ul>
          </Navbar>
        )}
      />  
      </NavStyle>
    )
}

const App = () => {
  const [userId, setUserId] = useState('');
  const [heroId, setHeroId] = useState("");
  const [redirectPath, setRedirectPath] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <Style>
      <Router>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} setRedirectPath={setRedirectPath}/>

      {
        redirectPath === '/heroes' ?
        <Redirect to='/heroes'/> : 
        redirectPath === '/charactersheet' ?
        <Redirect to={'/charactersheet/' + heroId} /> : 
        redirectPath === '/login' ?
        <Redirect to='/login'/> : 
        redirectPath === '/register' ?
        <Redirect to='/register'/> : null
      }
      <Switch>
        <Route path="/login">
          <Login setUserId={setUserId} setRedirectPath={setRedirectPath} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/register">
          <Register setUserId={setUserId} setRedirectPath={setRedirectPath} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/heroes">
          <Heroes userId={userId} setUserId={setUserId} heroId={heroId} setHeroId={setHeroId} setRedirectPath={setRedirectPath} loggedIn={loggedIn}/>
        </Route>
        {/* <Route path="/charactersheet/:id"> */}
        {/*   <CharacterSheet heroId={heroId} userId={userId} setRedirectPath={setRedirectPath}/> */}
        {/* </Route> */}
        <Route path="/charactersheet/:id"
        render={props => {
        return <CharacterSheet {...props} loggedIn={loggedIn} heroId={heroId} setHeroId={setHeroId} userId={userId} setRedirectPath={setRedirectPath} />;
      }} />
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/">
          <Home setRedirectPath={setRedirectPath} loggedIn={loggedIn}/>
        </Route>
      </Switch>

      </Router>
    </Style>
  );
}

export default App;
