import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";



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


    function toprofile(person) { //you have to make it this way if you dont want the page to defaut

        // e.preventDefault();
        localStorage.setItem('profile', JSON.stringify(person));
        localStorage.setItem('profileusername', person.username);
        localStorage.setItem('profilepassword', person.password);
        console.log(person.username);
        console.log(localStorage.getItem('profile')) //The token of the profile i clicked on
        console.log(localStorage.getItem('token')) //The token of the logged-in user
        history.push('/profile');
    }



    // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [users, setUsers] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/start');
  }

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
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
      <h2>Happy Coding!</h2>
      <p className="game paragraph">
        Get all users from secure endpoint:
      </p>
      {content}
        <img className="game image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5tIe5y2huezAN_WXwX-a4UMTfZw3TZ0nGfQ&usqp=CAU" alt="funny cat"/>
    </BaseContainer>
  );
}

export default Game;
