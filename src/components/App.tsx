import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import LoginForm from './LoginForm';
import { UserContext } from '../contexts/User';
import JobList from './JobList';
import JobApplicationForm from './JobApplicationForm';
import JobForm from './JobForm';

export default function App() {
    const { user, isLoggedIn, login, logout } = useContext(UserContext);

    return isLoggedIn === null ? <div>Loading...</div> : (
        <>
            <button onClick={logout}>Logout</button>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            {
                                !isLoggedIn ? (
                                    <>
                                        <li>
                                            <Link to="/login">Login</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/jobs/create">Create Job</Link>
                                        </li>
                                    </>
                                )
                            }
                            <li>
                                <Link to="/jobs">View Jobs</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
                    <Switch>
                        <Route exact path="/login">
                            {isLoggedIn ? <Redirect to="/" /> : <LoginForm onLogin={login} />}
                        </Route>
                        <Route exact path="/jobs/create">
                            {!isLoggedIn ? <Redirect to="/" /> : <JobForm />}
                        </Route>
                        <Route exact path="/jobs">
                            <JobList />
                        </Route>
                        <Redirect to="/" />
                        <Route exact path="/users">
                            <Users />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route>
                            <Error />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </>);
}

function Error() {
    return <div>404</div>
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}