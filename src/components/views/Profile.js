
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import {api} from "../../helpers/api";
import User from "../../models/User";




const Profile = () => {
    const history = useHistory();
    //const [birthday, setBirthday] = useState(localStorage.getItem('tem')); //wir brauchen den set scheiss um all das zu uptaden

    const puser = (JSON.parse(localStorage.getItem('profile'))); //localstorage kann nur strings speicher, objects müssen so umgeschreiben werden
    const currentid = puser.userId;

    const change = async () => {
        const response= await api.get( '/users/' + localStorage.getItem( "userid"));
        const logged = new User(response.data); //New user is created that is basicaly the copy of the user you got from the server
        localStorage.setItem('changer', JSON.stringify(logged));

        await history.push('/change');
    }


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

    const prettydate = (thedate) =>{
       if(thedate != null){
        let p = new Date(thedate);
        const curr_date =p.getDate();
        const curr_month = p.getMonth() + 1; //Months are zero based
        const curr_year = p.getFullYear();
        return (curr_date + "-" + curr_month + "-" + curr_year);
    }else{
           return "Not specified";
       }
    }

        //Also, there is probably a prettier way to show all these without me manualy writing them in.. but im tired
       let content = (
            <div className="game">
                <ul className="game user-list">
                    <div style={{ padding:"1em", paddingRight:"200px"}} className="player username" >Username: {puser.username}</div>
                    <div style={{ paddingLeft:"200px", padding:"1em",color:"lightblue",float:"right"}} className="player username" >id: {puser.id}</div>
                    <div className="player id">Birthday: {prettydate(puser.birthday)} </div>
                    <div className="player id">Creation date: {prettydate(puser.creation_date)}</div>
                    <div className="player id">Status: {logstat()}</div>
                </ul>
                <br/>
                <Button
                    disabled={localStorage.getItem('userid')!== currentid.toString()}
                    width="100%"
                    onClick={() => change()}
                >
                    Manage Profile
                </Button>
                <br/>

                <Button
                    width="100%"
                    onClick={() => logout()}
                >
                    Back
                </Button>
            </div>
        );


    return (
        <BaseContainer className="game container">
            <h2>PROFILE</h2>
            {content}
        </BaseContainer>
    );
}

export default Profile;
