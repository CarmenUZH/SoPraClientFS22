import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import User from "../../models/User";
import profile from "./Profile";
import axios from "axios";



//TODO remove unnecessary console logs for savety!!!!

const Game = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();


    const Player = ({user}) => (
        <div className="player container">
            <div style={{cursor:"crosshair", padding:"1em"}} className="player username" onClick={() => toprofile(user)}>{user.username}</div>
            <div className="player id">id: {user.id}</div>
        </div> //removed birthday and password
    );

    Player.propTypes = {
        user: PropTypes.object
    };

    async function toprofile(person) { //you have to make it this way if you dont want the page to defaut
        // e.preventDefault();
        localStorage.setItem('tem', person.birthday)
        localStorage.setItem('nem', person.username)
        localStorage.setItem('profile', JSON.stringify(person))
        console.log(JSON.parse(localStorage.getItem('profile')))
        history.push('/profile');

    }

  const [users, setUsers] = useState(null);

    const logout = async () => {
      console.log('testing log')
        console.log(localStorage.getItem('userid'))
      //We first get the logged in user with his token, then we log him out
        var stringid = localStorage.getItem("userid")
      await api.put('/users/' + stringid + '/logout');

      localStorage.removeItem('userid');
      localStorage.removeItem('tem');
      history.push('/start');
  }

    useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const response = await api.get('/users');

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setUsers(response.data);

        // See here to get more data.
        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    fetchData();
  }, []);

  let content = <Spinner/>;
//Each user gets mapped to one of the player things
  if (users) {
    content = (
      <div className="game">
        <ul className="game user-list">
            {users.map(user => (
                <Player
                    user={user}
                    key={user.birthday}  />
            ))}

        </ul>

        <Button
          width="100%"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <BaseContainer className="game container">
      <h2>User Overview</h2>
      <p className="game paragraph">
        Click on a username to see the profile
      </p>
      {content}
        <img className="game image" src="data:image/png;base64,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" alt="funny cat"/>
    </BaseContainer>
  );
}

export default Game;
