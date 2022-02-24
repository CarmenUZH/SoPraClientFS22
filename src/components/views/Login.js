import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";


/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
  return (
    <div className="login field">
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

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const DateField = props => {
  return (
      <div className="login field">
        <label className="login label">
          {props.label}
        </label>
        <input
           type="date"
           id="birthday"

           min="1987-01-01" max="2021-12-31"
           onChange={e => props.onChange(e.target.value)}
        />
      </div>
  );
};



const Login = props => {
  const history = useHistory();
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [birthday, setBirthday] = useState(null);


  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({username, name, birthday});
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);

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
          <FormField
            label="Username"
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField
            label="Name"
            value={name}
            onChange={n => setName(n)}
          />
          <DateField
              label="Birthday"
              value={birthday}
              onChange={b => setBirthday(b)}
          />


          <div className="login button-container">
            <Button
              disabled={!username || !name}
              width="100%"
              onClick={() => doLogin()}
            >
              Login
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
export default Login;
