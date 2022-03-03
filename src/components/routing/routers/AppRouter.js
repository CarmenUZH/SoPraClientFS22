import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import GameRouter from "components/routing/routers/GameRouter";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Start from "components/views/Start";
import Login from "components/views/Login";
import Register from "../../views/Register";
import Profile from "../../views/Profile";
//import {StartGuard} from "../routeProtectors/StartGuard";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */

//TODO: Add homepage before it goes to login/register
    //Why does it still not START at the homepage?
const AppRouter = () => {
  return (
    <Router>
      <Switch>

          <Route exact path="/register">
              <LoginGuard>
                  <Register/>
              </LoginGuard>
          </Route>

        <Route path="/start">
         <Start />
        </Route>

        <Route path="/login">
          <LoginGuard>
            <Login/>
          </LoginGuard>
        </Route>

        <Route path="/profile">
            <Profile/>
        </Route>

        <Route path="/game">
          <GameGuard>
            <GameRouter base="/game"/>
          </GameGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/start"/>
        </Route>
      </Switch>
    </Router>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
