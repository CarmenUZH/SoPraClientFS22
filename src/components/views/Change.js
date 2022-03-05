
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import React,{useState} from "react";
import {api} from "../../helpers/api";
import User from "../../models/User";



const DateField = props => {
    return (
        <div className="login field">

            <input
                type="date"
                id="birthday"
                min="1987-01-01" max="2021-12-31"
                onChange={e => props.onChange(e.target.value)}
            />

        </div>
    );
};

const Change = () => {

    const history = useHistory();
    const [birthday, setBirthday] = useState(localStorage.getItem('tem')); //wir brauchen den set scheiss um all das zu uptaden
    const [username, setUsername] = useState(null);


    const changeuser = JSON.parse(localStorage.getItem("changer")); //localstorage kann nur strings speicher, objects müssen so umgeschreiben werden

    const logout = () => {
        localStorage.removeItem('changer');
        history.push('/game');
    }

    const changebirth = async () => {
        console.log('testing change')
        //We first get the logged in user with his token, then we log him out

        const requestBirth = JSON.stringify({
            birthday
        });

        const requestUser = JSON.stringify({
           token: localStorage.getItem('token')
        });

        //We have to stringify Requests for api
        await api.put('/users/' + localStorage.getItem('token') + '/changebirthday', requestBirth)
        const borthday =  await api.put('/users/' + localStorage.getItem('token'), requestUser)
        const borthdayuser = new User(borthday.data);
        //how do i ACTUALLY refresh the information
        await setBirthday(borthdayuser.birthday);
        localStorage.setItem('tem',borthdayuser.birthday)

        history.push('/profile');


    }


        let content = <Spinner/>;
        if (true) { //Probably should remore the "if"... someday
            //Also, there is probably a prettier way to show all these without me manualy writing them in.. but im tired
            content = (
                <div className="game">
                    <ul className="game user-list">
                        <div className="player username">Username: {changeuser.username}</div>
                        <div className="player id" > Birthday: {birthday}</div>
                        <div className="player id" > Creation time: {changeuser.logintime}</div>
                        <div className="player id" > Status: {changeuser.status}</div>
                    </ul>

                    <DateField
                        onChange={b => setBirthday(b)}
                    />
                    <button
                        className="login but"
                        style={{backgroundColor:"lightblue", color:"black", cursor:"pointer", alignSelf:"flex-end"}}
                    onClick={()=>changebirth()}>
                        Save
                    </button>

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
                <h2>YOUR PROFILE</h2>
                <h4>Change your birthday by adjusting the Date field and then clicking the Save button</h4>
                {content}
                <img className="game image"
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5tIe5y2huezAN_WXwX-a4UMTfZw3TZ0nGfQ&usqp=CAU"
                     alt="funny cat"/>
            </BaseContainer>
        );

}

export default Change;
