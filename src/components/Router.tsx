import React, { useContext } from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import JobApplicationForm from "./JobApplicationForm";
import JobApplicationList from "./JobApplicationList";
import JobDetail from "./JobDetail";
import JobForm from "./JobForm";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import Success from "./Success";
import Error from "./Error";
import Home from "./Home";
import { UserContext } from "../contexts/User";

const Router: React.FC = ({ children }) => {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <BrowserRouter>
            {children}
            <Switch>
                <Route exact path="/login">
                    {isLoggedIn ? <Redirect to="/" /> : <LoginForm />}
                </Route>
                <Route key="create-jobs" exact path="/jobs/create">
                    {!isLoggedIn ? <Redirect to="/" /> : <JobForm />}
                </Route>
                <Route exact path="/jobs/created">
                    <Success message="Job has successfully created by you." to="/jobs" />
                </Route>
                <Route exact path="/jobs/edited">
                    <Success message="Job has successfully edited by you." to="/jobs" />
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
                <Route key="edit-jobs" exact path="/jobs/:id/edit">
                    {!isLoggedIn ? <Redirect to="/" /> : <JobForm />}
                </Route>
                <Route key="specific-job-applications" exact path="/jobs/:id/applications">
                    {!isLoggedIn ? <Redirect to="/" /> : <JobApplicationList />}
                </Route>
                <Route exact path="/jobs">
                    <JobList />
                </Route>
                <Route key="all-job-applications" exact path="/applications">
                    {!isLoggedIn ? <Redirect to="/" /> : <JobApplicationList />}
                </Route>
                <Route exact path="/resume_not_found">
                    <Error message="Resume not found..." />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route>
                    <Error message="Page not found..." />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;