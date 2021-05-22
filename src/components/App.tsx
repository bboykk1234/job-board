import { useContext } from 'react';
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
import Success from './Success';
import Error from './Error';
import JobDetail from './JobDetail';

export default function App() {
    const { user, isLoggedIn, login, logout } = useContext(UserContext);

    return isLoggedIn === null ? <div>Loading...</div> : (
        <div className="container-fluid d-flex flex-column">
            {/* <button onClick={logout}>Logout</button> */}
            <Router>
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
                    </ul>
                </nav>

                <Switch>
                    <Route exact path="/login">
                        {isLoggedIn ? <Redirect to="/" /> : <LoginForm onLogin={login} />}
                    </Route>
                    <Route exact path="/jobs/create">
                        {!isLoggedIn ? <Redirect to="/" /> : <JobForm />}
                    </Route>
                    <Route exact path="/jobs/created">
                        <Success message="Job has successfully created by you." to="/jobs" />
                    </Route>
                    <Route exact path="/jobs/applied">
                        <Success message="You have successfully applied the job." to="/jobs" />
                    </Route>
                    <Route exact path="/jobs/:id">
                        <JobDetail />
                    </Route>
                    <Route exact path="/jobs/:id/apply">
                        <JobApplicationForm />
                    </Route>
                    <Route exact path="/jobs">
                        <JobList />
                    </Route>
                    <Route exact path="/resume_not_found">
                        <Error message="Resume not found..." />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route>
                        <Error message="Page not found..."/>
                    </Route>
                </Switch>
            </Router>
        </div>);
}

function Home() {
    return <h2>Home</h2>;
}