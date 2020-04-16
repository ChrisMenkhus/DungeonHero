import React, {useState} from "react";
import styled from "styled-components";
import Button from '../components/Button.js'
import {background_superdark as background_verydark, label_red, secondary} from '../Colors.js'


const Style = styled.div`
    height: 100vh;
    background-color: ${background_verydark};
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
      background-color: ${secondary};
      color: ${background_verydark};
      -ms-transform: skewX(-20deg);
      -webkit-transform: skewX(-20deg);
      transform: skewX(-20deg);
      border-radius: 0px;
    }
    }

  .errorText {
    color: white;
    width: 100%;
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
    background-color: ${background_verydark};

`;

const Register = props => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmitRegister = event => {
  fetch('https://tabletophero.herokuapp.com/register/', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
    name: name,
    email: email,
    password: password
    })
  })
  .then(response => response.json())
  .then(user => {
    console.log(user);
    if (user.user_id) {
      setErrorText(user.email + ' registered'); 
      props.setLoggedIn(true);
      props.setUserId(user.user_id);  
      props.setRedirectPath("/heroes");      
    }
    else {
      setErrorText(user);
    }

  })  
  };

  return (
    <Style>
      <Wrapper>
        <Container>
          <h1>Register</h1>
          <Wrapper>
            <label>name</label>
            <Wrapper>
              <input type="text" onChange={(e)=>{setEmail(e.target.value)}}></input>
            </Wrapper>
            <label>email</label>
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

          <div className="buttons">
            <Button className="purple-button" onClick={(e)=>{ handleSubmitRegister() }}>Register</Button>
          </div>
        </Container>
      </Wrapper>
    </Style>
  );
};

export default Register;