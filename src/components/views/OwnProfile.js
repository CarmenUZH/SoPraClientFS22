
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import {useState} from "react";



const OwnProfile = () => {
    const history = useHistory();
    const [birthday, setBirthday] = useState(localStorage.getItem('tem')); //wir brauchen den set scheiss um all das zu uptaden
    const [username, setUsername] = useState(localStorage.getItem('nem')); //wir brauchen den set scheiss um all das zu uptaden


    const logout = () => {
        localStorage.removeItem('profile');
        history.push('/game');
    }

    const logstat = () => {
        let log
        if (puser.logged_in === true){
            log = "ONLINE"
        }
        else{
            log = "OFFLINE"
        }
        return log
    }

    const puser = JSON.parse(localStorage.getItem("profile")); //localstorage kann nur strings speicher, objects müssen so umgeschreiben werden

    let content = <Spinner/>;
    if (true) { //Probably should remore the "if"... someday
        //Also, there is probably a prettier way to show all these without me manualy writing them in.. but im tired
        content = (
            <div className="game">
                <ul className="game user-list">
                    <div style={{ padding:"1em"}} className="player username" >Username: {username}</div>
                    <div style={{ padding:"1em",color:"lightblue",float:"right"}} className="player username" >id: {puser.id}</div>
                    <div className="player id">Birthday: {birthday} </div>
                    <div className="player id">Creation date: {puser.creation_date}</div>
                    <div className="player id">Status: {logstat()}</div>
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
        </BaseContainer>
    );
}

export default OwnProfile;
