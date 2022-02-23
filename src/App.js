import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import {useState, useEffect} from "react";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {

    const[users, setUsers] = useState([])


   /* const addUser = async (user) =>{
        const res = await fetch("http://localhost:8080/users", {
            method: "POST", headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await res.json() //ohne das await keyword können server und front-end nicht syncen bevor front end sich ändert
        setUsers([...users, data])

    }

    useEffect(() => { //get Data from backendBABYYYY
        const getUsers = async () => {
            const usersFromServer = await fetchUsers()
            setUsers(usersFromServer)
        }
        getUsers()
    }, [])

    //fetch users
    const fetchUsers = async () => {
        const res = await fetch("http://localhost:8080/users")
        const data = await res.json()

        return data
    } */


    return (
    <div>
      <Header height="100"/>
      <AppRouter/>
    </div>
  );
};

export default App;
