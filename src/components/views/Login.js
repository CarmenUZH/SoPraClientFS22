import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory, withRouter} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import styled from 'styled-components';
import PropTypes from "prop-types";



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

const FormField = props => {
    return (
        <div className="login fieldlogin">
            <label className="login label">
                {props.label}
            </label>
            <input
                className="login input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

const FormFieldPass = props => {
    return (
        <div className="login fieldlogin">
            <label className="login label">
                {props.label}
            </label>
            <input
                className="login input"
                placeholder="enter here.."
                type="password"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};


FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};


const ButtonContainer = styled.div`
  justify-content: center;
  margin-top: 20px;
`;



const Login = props => {
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");



    const doLogin = async () => {
        try {
            const requestBody = JSON.stringify({
                username,
                password
            });//Requestbody that gets sent to the server

            const response = await api.put('/users', requestBody); //PUT gives you back the user, NOT GET!! NOT ALLOWED!!

            // Get the returned user and update a new object.
            const user = new User(response.data);
            console.log(user)
            // Store the token into the local storage.
            localStorage.setItem('userid', user.userId);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/game`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };

return (
    <BaseContainer>
        <div className="login container">
            <div className="login form">
                <img className="game image" src="https://t3.ftcdn.net/jpg/03/74/30/62/360_F_374306203_SMTL4De1OOWASFLtO0tkmXvEatxwf4Ry.jpg" float="left" height="100px" style={{marginTop:"6px", flex:"auto"}} alt="funny cat"/>

                <FormField
                    label="Ender Username"
                    value={username}
                    onChange={un => setUsername(un)}
                />
                <FormFieldPass //so that the user doesnt see his password when he tries to log in
                    label="Enter password"
                    value={password}
                    onChange={n => setPassword(n)}
                />

                <div className="login button-container">
                    <Button
                        disabled={!username || !password}
                        width="100%"
                        onClick={() => doLogin()}
                    >
                        Login
                    </Button>



                </div>
            </div>
        </div>
        <br/>
        <div className="login container">
            <div className="login form">
                <div className="login button-container">
            <Button
                width="10em"
                style={{justifySelf:"center", }}
                onClick={() => history.push(`/start`)}
            >
                Back
            </Button>
            </div>
            </div>
        </div>

    </BaseContainer>

);
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login); //"This gives the Login component access to this.props.history, which means the Login can now redirect the user."
