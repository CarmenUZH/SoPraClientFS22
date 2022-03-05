
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import {useState} from "react";



const Profile = () => {
    const history = useHistory();
    const [birthday, setBirthday] = useState(localStorage.getItem('tem')); //wir brauchen den set scheiss um all das zu uptaden


    const logout = () => {
        localStorage.removeItem('profile');
        history.push('/game');
    }

    const puser = JSON.parse(localStorage.getItem("profile")); //localstorage kann nur strings speicher, objects müssen so umgeschreiben werden

    let content = <Spinner/>;
    if (true) { //Probably should remore the "if"... someday
        //Also, there is probably a prettier way to show all these without me manualy writing them in.. but im tired
        content = (
            <div className="game">
                <ul className="game user-list">
                    <div style={{cursor:"crosshair", padding:"1em"}} className="player username" >Username: {puser.username}</div>
                    <div className="player id">Birthday: {birthday} </div>
                    <div className="player id">Creation date: {puser.logintime}</div>
                    <div className="player id">Status: {puser.status}</div>
                </ul>


                <Button
                    width="100%"
                    onClick={() => logout()}
                >
                    Back
                </Button>
            </div>
        );
    }

    return (
        <BaseContainer className="game container">
            <h2>PROFILE</h2>
            {content}
            <img className="game image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5tIe5y2huezAN_WXwX-a4UMTfZw3TZ0nGfQ&usqp=CAU" alt="funny cat"/>
        </BaseContainer>
    );
}

export default Profile;
