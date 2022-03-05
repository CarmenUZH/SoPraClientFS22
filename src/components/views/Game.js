import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import User from "../../models/User";



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
        console.log(person.username);
        if(person.token !== localStorage.getItem('token')){

        history.push('/profile');}
        else{ //basically, ein eingeloggter user kann sein Profil nur bearbeiten, nicht sehen wie die anderen
            localStorage.setItem('tem',person.birthday)
            change();
        }
    }


  const [users, setUsers] = useState(null);

  const logout = async () => {
      console.log('testing log')
      //We first get the logged in user with his token, then we log him out

      const requestLogged = JSON.stringify({
          token: localStorage.getItem('token')}); //We have to stringify Requests for api

      const response= await api.put('/users/' + localStorage.getItem('token'),requestLogged)
      const logged = new User(response.data); //New user is created that is basicaly the copy of the user you got from the server
      console.log(logged.username);


      const requestBody = JSON.stringify({
          username: logged.username,
          password: logged.password}); //This seems really unsave - ask Tutors about it!

      await api.put('/users/' + localStorage.getItem('token') + '/logout',requestBody);
      localStorage.removeItem('token');
      history.push('/start');
  }



    const change = async () => {
        console.log('testing change')
        //We first get the logged in user with his token, then we log him out

        const requestLogged = JSON.stringify({
            token: localStorage.getItem('token')}); //We have to stringify Requests for api

        const response= await api.put('/users/' + localStorage.getItem('token'),requestLogged)
        const logged = new User(response.data); //New user is created that is basicaly the copy of the user you got from the server
        localStorage.setItem('changer', JSON.stringify(logged));

        const requestUser = JSON.stringify({
            token: localStorage.getItem('token')
        });
        const burthday =  await api.put('/users/' + localStorage.getItem('token'), requestUser)
        const birthdayuser = new User(burthday.data);
        localStorage.setItem('tem',birthdayuser.birthday);

        if(localStorage.getItem('profile')==null){
            localStorage.setItem('profile', JSON.stringify(birthdayuser));
        }

        console.log(localStorage.getItem("tem"))
        await history.push('/change');
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
              onClick={() => change()}
          >
              Manage Profile
          </Button>

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
