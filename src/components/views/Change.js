
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
        <div className="login fieldzwei">
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
        console.log(birthday) //test functionality
        //We first get the logged in user with his token, then we log him out
        const requestBirth = JSON.stringify({
            birthday: birthday,
            username: username
        });

        await api.put('/users/' + localStorage.getItem('userid'),requestBirth)
        await changename();
        await changebirth();
        history.push('/ownprofile')

    }
    const changebirth = async () => {
        const borthday =  await api.get('/users/' + localStorage.getItem('userid'))
        const borthdayuser = new User(borthday.data);
        //how do i ACTUALLY refresh the information
        await setBirthday(borthdayuser.birthday);
        localStorage.setItem('tem',borthdayuser.birthday)

    }


    const changename = async () => {
       try {
           const namechange = await api.get('/users/' + localStorage.getItem('userid'))
           const nameuser = new User(namechange.data);
           //how do i ACTUALLY refresh the information
           await setUsername(nameuser.username);
           localStorage.setItem('nem', nameuser.username)

       }catch (error) {
           alert(`Something went wrong during the change: \n${handleError(error)}`);
       }
    }

    const logstat = () => {
        let log
        if (changeuser.logged_in === true){
            log = "ONLINE"
        }
        else{
            log = "OFFLINE"
        }
        return log
    }



    let content = <Spinner/>;
        if (true) { //Probably should remore the "if"... someday
            //Also, there is probably a prettier way to show all these without me manualy writing them in.. but im tired
            content = (
                <div className="game">
                    <ul className="game user-list">
                        <div className="player username">Username: {username}</div>
                        <div className="player id" > Birthday: {birthday}</div>
                        <div className="player id" > Creation time: {changeuser.creation_date}</div>
                        <div className="player id" > Status: {logstat()}</div>
                    </ul>

                    <FormField
                        label="Change Username"
                        onChange={un => setUsername(un)}
                    />

                    <DateField
                        onChange={b => setBirthday(b)}
                        label="Change Birthday"
                    />
                    <br/>
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
                     width={"200px"}
                     style={{display:"flex"}}
                     src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUSEhIREhISEhEQERASERISERIRERERGBQZGhgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISHzchISE0NDQ0NDQ0NDQ0NDQxNDE2NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NDQ0NDQ0NDQ0NDQxNP/AABEIAJ0BQQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAABAAIDBAUGB//EAE4QAAIBAgMDBggKBwUHBQAAAAECAAMRBBIhBTFBBhMiUWFxBxQyUoGRobEVI0JDU5KTwdHSM2Jyc4Ky8DRUs9PhFyU1Y5TCwxZ0g6Kj/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAIhEBAQACAQUBAQADAAAAAAAAAAECERIDEyExQVEEFCIy/9oADAMBAAIRAxEAPwDr7w3kd4QZhT7x0YDDeFOgMF4YQoYAYoBigvDeaBEQMF4oDrxXgEV4Drw3jLwgwHQxsMIeIo0R0AwiNigG8V4IoBMEEUDSoDoiQVaKsRfcDc9wk9A9EQZbsewTj7ezHwbSpWJc+Ud3YvARYllZbN65Iz2mdjathLdSabmNyyZWLsCVBuNSJjYt7TQ527u3BVPrO775gYutdtJ5ctfHuxx17R1J1OzsD4vRJb9LUAL/AKg+Svt17e6RbG2SKdqtXWoNUTgh6z1t7u+Wdo1swMuM4+b7csryup6cVtiseczH5JmFtTE9AsOqbW2he85TaYOQjrNpcbvwZKGzkJa/WZ0uAojKTKmxcB0cxE0l6BK9c62zbnPTO2ktka2+0x8Liqo0Dvpu6RmxtF+Er4VATMStXHdReO4jz39cU1ObiheD1S8IMjBjgZ6XykgMN5GDHAwH3ivGXivAfeG8YDDeEGOjAYbwDeIGNvEDNCQGKNBivAdeEGNvCIDhHCNBiEIfeGNvDAMUEUAxXgigKKIyXCIGqKDqCTcegwLmGPRj1Op/rSWVogbgPVA6IoLsFUKCSx6IUcSSdwnHT1c4pVphbUrWvHbQ5VYNLhcXhqhHBK1/aoI9swRtQ4tyuH5pyNci1kZ+8r5VvROXUt9R6ujlPdpYipkS3FtW7zwkuytn5SKtTyhqieb2nt7OHuqPsPGO4Y5VtuAIIHrktSs9HoVTd1Aud177pzk+12yzmXiNatX7ZQxOMUA3MysRtAnjM+tXLSWp4iLaVXMxtOf2ityo6zebFQWBJmetI1HzEacIxqZN7ZVICkNJQ2guuk1sEwWnaZ2LNyZu5bZkYOK4d8s4BNLxuLp9ICTYfQWiUi3pBIMsUba29NvHAxkM9b5KRTHXkQMcDAfeIRt4bwDeOBjREDCHxRt4YBigivNBwhjQYbwDHAxgjhAcIRGiEQh0N40GGAbwxsN4BigvBeA4mWdn/pF9P8plW8tbO/SL3N7pKs9tmeL8otpVtrbRXBI5XDjENQpprkGQnPVZflN0XYX3AAC1yT7NPFNu4Opsnai4vIWonEvWot8moj5i9PN8lgrONew6ic76dY9Cw3ITZ1Cn06KvlAz1cRUYkndc6hV9AE53bXIHCvUSpg8ZRwoFyytV53K4IKtTOcMp38eAtabmJ5T7Lx2GelVxS06dYKHSoxoVRZg1tR1qNVuO2eacraOzECLs93dw7c6zlzTyZdApYC5vxFx2yXUhNvaNmoRRpq9VcQ6oFeugCiqy6FrAkA9eu+84/ltStiFI3NRT1hnH4TY8HNBk2ZhlZWQnn2yspU2au5U2PAggg8QRKvLdCHpNberr6mB++c+r/wA7d+jf9tOLakZG5y7tTLDNffGhBPO9jPamWN29UkVLS0V7JEyy7QucNrCQ5eMnFOIpJs0znp3N45Kctsk0dibLapUUlTkUgk9c1hvK6jOdmM3VP4HfqinoviSxT1dqPJ32eGhDSEGPBnR5kgMcDIwYrwJQ0IMiBjgYEt4QZGDHAwH3ijQYQYQ68EV4oCvDeCKaDwY68jEeDAdeG8beKA8GK8AhgG8MbeG8IMUbeGAZa2eQKlzuCsT6pUvJaR0fh8W3vEzndY2tYTeUjTO0KY+WB6GjK+LoVEZKjU3RhZlcZkYdRUixmJa28j3SltXadDDIHruEBvkFszuRvCqNT93GeKdbK+o916OM+rdXkzstzc4aiP3bVKa+pCBLWA2VgKBD0qGHRxufm87judrkeucFU8INAGyYesRwLPTQn0dL3y/szlrhqzBHD0GYgKamXm2J4Z1On8QAmufU96Z4Yfr0FtpU+LjXrBmPt0JiQqobsgY7mFr26+6Myx9JbE9w++TDO55TG+qZYzp43LH3HF4nAOhPRPoEbSwLsdEM7ooDvAhVANwE7f48/WP8u69OVobAc77CMxmxmp6gZp18RAO8S3+eaZn9WW3Acw27KfVJqWy3fctu+dr4um/KJKqAbhMz+f8Aa3l/V+RzuA5OgENU17OE6ChRVBZQBJBDO+OGOPp5s+pll7C8UUU6Obn468YAYbTm2eDLGHwr1NUW4BsSSFUHvMqgGbOyx8Xw8tvcszllqLjjumpsdvlVKa9ma8eNkf8AOp/16ZaK9kZWrJTXPUZaaDezuEUek6TPOuvbiH4JH0yer/WEbLH0yfVJ++R4Ta2HqnLSxFCo3m061N29Sm8ts9uBPYAL+2OdO3EFTAIil2roFUEkldwHpjRs8m2V1t1vZPZcn1gSvts5sLiQVYfEVrXKb8jWIsZcpDojytw3acO0zPcuztw34Nbz6f1oPg1vPp/Wj6rols1RUve2d1W/Xa5j6bggEEMp1DAgg9xEdynaxVzgLGxqUr9WfWPGzz9JT9Zk9Sqi2zOqA7szhb+s6xIQwDKwZTexVswOvAiXuZHbxQNs8j5yn2dK143xQ+dT+t/pHYkWakb/ADjDqH6J+zsklx1ffM96naxQ+Knzk+uIvFW60+uslsOr2W98iOKTNkNRA18uUumYNuta+/sk72S9rEfFm60+usXi7dafXX8ZKf63Qnu90vev4nahq4U2BL0xv3uOEXih8+mf4xK6gDPp8454easDuFFyVUDeWYKBrbfHev4s6ON+rPibdaH+NYRg36ge5llSnUV7lGRwN+Rg4HfaOYWBJKgLqSdAB90d6/h2J+rBwT+YfWIGpNTV2dSoybzuvmWVKbh/IdGA35CGsTuuQdJV2uCKLG50NPrt5Ymc+tbjZpvHoSZS7SnEAAngASTfcJ5Rhy21MepqMyrVYsdbmnh0BYIvUbaX62J11v6FRr5kKNoGVlJ03EWnn3JjEDBY5RiOhlD0ahN7IWAs37NwuvU1905dL1de3XqTzN+npWF2Th6Sc2mHpBba3ppUZv2mYXY9pJnNbW5EJVq56TjD02UZqYpFxnublBmAUEW03TrDjaQTOalMU7X5w1F5u3Xmvac5g+WQq4vxejhmq0y2Vagcq2UAZnZGXRRqb3GluJtM48/Ni3h6rpMCop06dNnZzTREztbM+UAXPbpIcVthKT5MjMxQPZbXAJYD+Uy6QOqZKYMVMVXe9ubXD0xcfqs5/nkwysy5RcsccsdVYTboO6lU+rLVPaJbdSqDvsIqeEA6j7IadekPnKf2ifjPROtk4Xo4LKVGPyCO8rJlVjwt6RIFxdMfO0h/8lP8ZPRqo+iVEcjUhXV7d9jNd7JntYjlPZ6xEDJcshtOvTzuW9uXUwmOtHRQAHqhAnVyK0UNuyCNmlfxKIYLsl+x6orGeXdejUUfE+yWKaFFAAO8nQDs6yJLYx19AD290lu1k0z9sbQXC4epiHF1prfLoC7kgIoOtrsVHpnlWz9n4nbNd6lSoAqWLuyk06Ia+WnSp336HS40FybkX7PwoVLYJFG58VSDa8Ajt71Eb4MEAwTsALviqmb0JTA9nvhpze3+Qb4ai2IpVhWFIZ6iNT5t1RdWdTmN7b7aaA7906Lwd7bq4ik9Ktnc0gpp13DEOhuMpbczKQNb3IbsJnZkX6tYiP60j4ulLadzRrAcaVQf/Q8bGWKR6Kgeau424dhgxi3p1B1o49amOTyRu8kcOyZV594V1/sdx/et5v8ARTquR5Pwfg+HxCdfWeycv4VrWwZ034n3U5kbK27tOnRp06FGo1FEtTYYN6gKXO5wvS46zXxnflt+FU3o4W+vxz8P1O3um3yAv8G4axAHx4Asb/2h+37p55yj2rja6U1xlN0RHJQthmoAuVsRcgX04T0PwfH/AHbh9QNcR/j1JD628SLNSJsSXI3Aac25kncPcJHiT06I11d+35l+MlDiY15aVtoY4YejUruOjRR6hF95A0XvJsPTPCagd8+Ia92q3eqBb498z6Hr6LH0T0fwn7Sy0aWFGjVn5x/3aWyg97kH+AyLAcni+xWp5Dz1dTi16JuXFjTHpRVX+MzU8RLN11fJ/aQxeFpV9MzpZwPk1F6Li37QNuy00CRxv6QZ5z4L9p9OrhGbouOepftABXGvWMht+q09HIPf33H3TOU1Vl3EaAWP7xt37KzA5cpfZ2J7qXG/zyTfQ7/2j28B+Ew+Wv8Aw/FafIQ7v+akT3F+V5vyP20MHiQzaUKuVK44Bb9F+9SSe4t1z1LlQL4DGcR4rXOliD8W08u2fsQ4jAV8RTBNXC1ySB8uhzSFhbrXVh2ZhxE3dg7e53ZuMwlRunh8HiOaJI6dDm2AHepIHcV6jOlnmVmX4m8FWgxY3a4U7uyrO12phWqUnSmAXbLbcu5wx13cDOJ8FR1xg7MKfbWnoaNqNPb2TnlN3VbxuptzFHZWIX5tvr0/xjcdybXE25/DsWUWDqQrgdWZTqOw3E6/NFmknSk9Wl6tvuR54vg7ohrkYkjqLUx7Ql/bOi2VsVcKpWjR5vNbO1izvbdmdrkjs3TocxivNXDfu1mZ6+M4I/U3pWNwNP8ASPxerc/woq/dNEkyLDIMguN7OfbM8OPprlv2CCxGnETxLZGyBi8X4sHFMs1bplM9sgZvJuL7uue5KguO8cTPD8HXrUsYz4ZS1dauIVFVOcJ8sNZOPRzTWH1nL46j/Zkf72v/AEpH/knQ8keSfiD1HNdavOoqWFI08tmve+c3nM/D+2foKv8A0DflnU8jcfjKwr+O03plDS5vPQNC4IfNa4Gbcvr7Zby0TW3T37fbCFkZiD6RhdbTPHaXLFlkXOxc5OvKufFNaKQ85BHKnGNKwiIEjzGDXsk2aShRK+I4cNDxklz2SLEX09Mzb4XGeXPcsdlNisHVpp0qi5KtNRe7OhuVFzvK5lHaROK8HvKOnhucw9d+bSo/OU6jXyK+UKyufkghVsd2hvvE9PBIvv8AZOb27yNw2Lc1enRqsbu9PLlc9bodL9osTxvHhs3lJyvw9LDvzFdKtd0ZKQpVA+RmFgzFTZQu/fra0peDzaeKxC1WxFQ1KNPKiM6qHaodWGfS4VbXvfyxroZFhvBvQDXqYirUUHyFRaV+wnU+q07LBYZKNNKdNBTRBZUS9l49epvrfeTITaSp0lYDirbiOqSJuHcOyMqG4O/UHhGI40G7TQcJJdVdOF8K46ODP62J91OdJyMDfB+E1FuaOljfy243+6DlJyfp49aS1HqJzRcjm8lznCg3zA+aJobIwK4ajTw6FmWkpVWcjORmJ1tpxmk15cn4Vf7PhtR/aG/wnmt4O/8AhtD9rE/47y3yj2CmOppTqPUQU3zqUyXJylbHMCLWaWNh7KXC0Ew6MzrTLkNUy5yWZmN7C29jHw+p8SvxlEWPlvrZRf4ippLGTv8AZvlfE25zDjrquLcL+L1j69JJiKZZWVWKFlZQyjVCRa44XG+Y0ryHb9R9o7TenSIOZ/F6JNwgSmDdiQCctw76A6GXxyCxvCvhvt8QP/HOq5PcjaWDq88j1XYIyKHy5VDWuwyqNbAjf8ozpmHf67iW5fiTH9eLV8LW2XjKRfIz0ilYZGZkqUzcMAWAOozru657JRrK6K6MCjqrowN1ZGAKkacQRMXlDyZpY40zUZ6bUg4DUygLK1tGDKdxGneZo7I2eMNRSgru60wVVnyZ8tyQDlAFhuHZaS3cWTVWUa+a2vSIvu4D/WY/LIf7vxf7sfzrNpPlaXs/HX5KyrtTALiKNSgxZVqpkLKekBcG4vccJI1fTkvBb+gxP/uF42+bX8JzXLDYrYLEl6YK0MQKhp5dyBlK1KXdZjYeawHAz0bk7sFMCj06bu4qOHJfLcELbTKBpLG2tl08ZRahUuFJVldR00cbmUnS9iR3MZrflnXhxXgqPSxguPJw2/XjVnoyAkgaf0DMLk3yZp4E1Gp1KjmsEDZ8mmQta2UDzjNqtVyDMTbUe2S+aT0tGnFaZ3wkOseuL4RHWJtlpZYCJnfCI6xB4/BpfMCCyL6ffKBxZl1HDU0YbjeTL0s9nrw3TxzYeJSjtcVKjrTRMTjczsQqqCtVRc95A9M9jQzjcT4O8PUqPUNfEA1Hdyq81lBdixAum7WSeitz/wBT4H+94f7VZPgtt4as+SjiaNRyCQiOrMQN5tOX/wBmmH/vGJ//AB/JNLYPIqlg664inVrOyq65X5vLZlsfJUGNQ8umPrmYaxvNQjs9s5xsSLnvMuE81cvS9zkBrSmMQI9al500wsc+YZDeKUdNliI/q8h1872Q69Z9U57TR5brHtlbGUmqAZKmQg78uYEd1xJvSfVHAdpkym41j4rPp4asN9Sm3bzbX/njzQqefT+zf88vDvMHrmfTW1PmKnn0/s3/ADxeLP59P7Nvzy4R2mC/aY2KFXCVSpAqUwSCL82x/wC+JcA1tWp30vZCuv1peJ/WMXpmV2pHB1OFRfq3++P8Xfzkv+w35pbt2mG3b7pTamtJ/OX6h/NEyP56fUP55cK34wFI8nhkVsHVapScVqfxbswHNEg3pulvL6nPptJ+YrfSUvRRb/Ml5hu1i9Mm6KK0K3GpT4fMv+eJ8PW4VKf2T/5kvW7YD3ybozjha30lK/7lvzx3i1b6Sl9g/wDmS/6YvTCs7D4KqubNURszltKZAAygWHTPVJWw7+eg/gJ/7pdv2xpXtPrgUDhqlv0lO/7o/nki0H+kT7M/mlu3bFbtEKgGHf6RfqH80ir7ONSwap0epUyn1kmXPSIix7Il8pYz12Kg+U59I/CSLspB1+uW7nsiv3Trtz4oBs9BwhGDTq98mv3RX7o2ukXiq9UY+C3Zaj0xrcIEIJPYymT3PZADMZVrGI0wpHzjntK0wfYojuYPnn1L+EfeLN2zG2tAKR84+pfwgNE7s5+qv4R2Y9cWY9cbNIXw7HdUYdyp+EqrshB5x7z+AmhmPXI8x65vHLTOU2rjZqDh749cGo4D2ycHtEV+6b5M6R+KjqHtiktz1xS7Tis8yYeZMtmK03xjnyqnzRjhSMtWgtM3GLuq3NmI0z1SxFM8YvKq3NmA0zLUEcYvKqxpmIIeqWDEJOMOVV+bMWQ9UsQ3jjDlVXIYchliKOMXlVUpFzcsNFHGLtXyGApLOaBhHGHKqppGHJ2SxFJxhyqtzZiCGWYo4nKq+WDLLJjY4ryQZIDTli0Rk4w5KuSLJLAEOWXibVskOSWLQRpNqxSIJLBgmbGpkgymHJJrxTOl2hyxZZNFGjaDLGlZOYCBLIlqDLHZZJaG03Im0WWKSxSm2jeMYx8BE6uJgaOzQWitJ5BvFGmKTbR0UbBG00deC8EUilFFFAMUAhBgNaCOMUBkUeIpNLtFFJTBGjaOKOYRsaXZRRRRo2BJivDFIuzIrwxSKbeLNCRBMgXgJjpGRJasHNFmjTBJtrR2aLNGxRs0dmjS0EYY2aSZoc8iEdaWVmw/PFGRTW00/9k="
                     alt="funny cat"/>
            </BaseContainer>
        );

}

export default Change;
