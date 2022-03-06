
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {ApplyButton} from 'components/ui/ApplyButton';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import React,{useState} from "react";
import {api, handleError} from "../../helpers/api";
import User from "../../models/User";
import PropTypes from "prop-types";


const FormField = props => {
    return (
        <div className="login field">
            <label className="login label">
                {props.label}
            </label>
            <input

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

const Change = () => {

    const history = useHistory();
    const [birthday, setBirthday] = useState(localStorage.getItem('tem')); //wir brauchen den set scheiss um all das zu uptaden
    const [username, setUsername] = useState(localStorage.getItem('nem'));


    const changeuser = JSON.parse(localStorage.getItem("changer")); //localstorage kann nur strings speicher, objects müssen so umgeschreiben werden

    const logout = () => {
        localStorage.removeItem('changer');
        history.push('/game');
    }
    const both = async () => {
        await changebirth()
        if(username !== localStorage.getItem('nem')){ //Wenn du das nicht machen würdest, wäre immer error wenn du NUR den Geburtstag ändern wollen würdest
            await changename()
        }
        history.push('/ownprofile')

    }
    const changebirth = async () => {
        console.log('change') //test functionality
        //We first get the logged in user with his token, then we log him out

        const requestBirth = JSON.stringify({
            birthday: birthday,
            username: username
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

    }


    const changename = async () => {
       try {
           console.log('change') //test functionality
           //We first get the logged in user with his token, then we log him out

           const requestName = JSON.stringify({
               birthday: birthday,
               username: username
           });

           const requestUser = JSON.stringify({
               token: localStorage.getItem('token')
           });

           //We have to stringify Requests for api
           await api.put('/users/' + localStorage.getItem('token') + '/changename', requestName)
           const namechange = await api.put('/users/' + localStorage.getItem('token'), requestUser)
           const nameuser = new User(namechange.data);
           //how do i ACTUALLY refresh the information
           await setUsername(nameuser.username);
           localStorage.setItem('nem', nameuser.username)

       }catch (error) {
           alert(`Something went wrong during the change: \n${handleError(error)}`);
       }


    }


        let content = <Spinner/>;
        if (true) { //Probably should remore the "if"... someday
            //Also, there is probably a prettier way to show all these without me manualy writing them in.. but im tired
            content = (
                <div className="game">
                    <ul className="game user-list">
                        <div className="player username">Username: {username}</div>
                        <div className="player id" > Birthday: {birthday}</div>
                        <div className="player id" > Creation time: {changeuser.logintime}</div>
                        <div className="player id" > Status: {changeuser.status}</div>
                    </ul>

                    <FormField
                        label="Change Username"
                        onChange={un => setUsername(un)}
                    />
                    <br/>
                    <button
                        className="login but"
                        style={{backgroundColor:"lightblue", color:"black", cursor:"pointer", alignSelf:"flex-end"}}
                        onClick={()=>console.log("beep")}>
                        Save Name
                    </button>
                    <br/>
                    <br/>
                    <br/>
                    <DateField
                        onChange={b => setBirthday(b)}
                        label="Change Birthday"
                    />
                    <br/>

                    <button
                        className="login but"
                        style={{backgroundColor:"lightblue", color:"black", cursor:"pointer", alignSelf:"flex-end"}}
                    onClick={()=>console.log("beep")}>
                        Save Birthday
                    </button>
                    <br/>
                    <h6 style={{marginTop:"50px", marginLeft:"90px", paddingBottom:"1px", marginBottom:"1px" }}>Dont forget to apply your changes to save them!!</h6>
                    <ApplyButton
                        className="login applybut"
                        onClick={()=>both()}>
                        Apply changes
                    </ApplyButton>

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
                <h5>Change your name by adjusting the Form field and then clicking the Save button<br/>
                Change your birthday by adjusting the Date field and then clicking the Save button</h5>
                {content}
                <img className="game image"
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5tIe5y2huezAN_WXwX-a4UMTfZw3TZ0nGfQ&usqp=CAU"
                     alt="funny cat"/>
            </BaseContainer>
        );

}

export default Change;
