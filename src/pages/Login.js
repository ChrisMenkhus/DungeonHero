import React, {useState} from "react";
import styled from "styled-components";
import Button from '../components/Button.js'
import {background_primary, interactive} from '../Colors.js'





const Style = styled.div`
    height: 80vh;
    background-color: ${background_primary};
    h1 {
      text-align: center;
      font-weight: lighter;
      margin-top: 0.25rem;
    }
    label {
      text-align: center;
      width: 100%;
      padding-bottom: 0.2rem;
      font-weight: lighter;
      font-size: 1.1rem;
    }
    input {
      margin-left: auto;
      margin-right: auto;
      border: 0px;
      padding: 0.2rem 0.3rem;
      border-bottom: 1px solid white;
    }
    .checkbox {
      display: inline;
      margin: auto;
      margin-top: 0.5rem;
      outline: none;
    }
    .buttons {
      display: flex;
      margin-bottom: 0.25rem;
    button {
      margin: auto;
      margin-left: auto; margin-right: auto;
      background-color: ${interactive};

      border-left: 3px solid white;
      border-radius: 0px;
      }
    }

    .errorText {
      color: white;
      width: 100%;
    }


    .loadingicon {
      padding-bottom: 1rem;
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


const Wrapper = styled.div`
  display: flex; flex-direction: column;
  height: 100%;
  justify-content: center;  align-content: center;
`

const Container = styled.div`
  display: flex; flex-direction: column;
  margin: auto;
  height: auto;
  width: auto;
  padding: 1rem 3rem;
  background-color: gray;
  background-color: ${background_primary};

`;

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = event => {
  setIsLoading(true);
  fetch('https://tabletophero.herokuapp.com/login/', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
    email: email,
    password: password
    })
  })
  .then(response => response.json())
  .then(user => {
    setIsLoading(false);
    if (user.user_id) {
      setErrorText('logged in');
      props.setLoggedIn(true);
      props.setUserId(user.user_id);  
      props.setRedirectPath("/heroes");  
    }
    else if (user === 'error') {
      setErrorText('information not valid.');
      //setErrorText(user);
    }

  })  
  };

  return (
    <Style>
      <Wrapper>
        <Container>
          <h1>Login</h1>
          <Wrapper>
            <label>username</label>
            <Wrapper>
              <input type="text" onChange={(e)=>{setEmail(e.target.value)}}></input>
            </Wrapper>
            <label>password</label>
            <Wrapper>
              <input type="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
            </Wrapper>
            {/* <div> */}
            {/*   <label>keep me logged in?</label> */}
            {/*   <Wrapper flexdirection='row'> */}
            {/*     <input className="checkbox" type="checkbox" /> */}
            {/*   </Wrapper> */}
            {/* </div> */}
          </Wrapper>
          <p className='errorText'>{errorText ? errorText : null}</p>

          {isLoading ?
          <div className='loadingicon'>
          <ion-icon name="reload-outline"/>
          </div>
          :
          <div className="buttons">
            <Button className="purple-button" onClick={(e)=>{ handleSubmit() }}>Login</Button>
          </div>
          }
        </Container>
      </Wrapper>
    </Style>
  );
};

export default Login;
