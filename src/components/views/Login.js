import React from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {withRouter} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import styled from 'styled-components';



//Copied these online - changed a few things to make them unique to me

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  align-items: center;
  max-height: 300px;
  min-width: 45%;
  height: 90%;
  float: left;
  //margin-left: 25%;
  position: absolute;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 300px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background-color: rgb(0, 0, 0, 0.8);
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(0, 0, 0, 0.8);
  }
  height: 50px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255);
`;


const ButtonContainer = styled.div`
  justify-content: center;
  margin-top: 20px;
`;



class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null
        }; //These two things get changed over the course of logging in
    }

    async login() {
        try {

            localStorage.setItem('username', this.state.username); //Username in local storage gets set

            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password}); //Requestbody that gets sent to the server

            const response = await api.put('/users', requestBody); //PUT gives you back the user, NOT GET!! NOT ALLOWED!!

            const user = new User(response.data); //New user is created that is basicaly the copy of the user you got from the server
            localStorage.setItem('token', user.token);



            // Login successfully worked --> navigate to the route /game in the AppRouter
            this.props.history.push(`/game`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) { //According to the internet i need that to handle the changes in the thingy
        this.setState({[key]: value});
    }

   // componentDidMount() {} //"If you need to interact with the browser, perform your work in componentDidMount() or the other lifecycle methods instead. Keeping render() pure makes components easier to think about."
    render() {
        return (
            //WARNING: i added an image just to test out how i would design the actual login page, take it out or change the src before showing the tutors your code
            <BaseContainer>
                <FormContainer>
                    <img className="game image" src="https://64.media.tumblr.com/14dfbcddfa48a39c19d1ff1c192b48e2/3a199dbf6c11948d-c7/s500x750/576cb9bfe0a3c1d489ef5872b540ae8cffa96cd8.png" float="left" height="350px" alt="funny cat"/>
                    <Form>
                        <InputField
                            placeholder="Username"
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                        <InputField
                            placeholder="Password"
                            onChange={e => {
                                this.handleInputChange('password', e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                disabled={!this.state.username || !this.state.password} //if one of these fields isnt filled in then button wont work lmao
                                width="100%"
                                style={{color: "black"}}
                                onClick={() => {
                                    this.login();
                                }}
                            >
                                Login
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}



/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login); //"This gives the Login component access to this.props.history, which means the Login can now redirect the user."
