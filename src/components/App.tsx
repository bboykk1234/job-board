import { useContext } from 'react';
import { UserContext } from '../contexts/User';
import Layout from './Layout';
import Router from "./Router";
import Header from "./Header";

export default function App() {
    const { isLoggedIn } = useContext(UserContext);

    return isLoggedIn === null
        ? (
            <Layout>
                <div className="text-center my-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Layout>
        ) : (
            <Layout>
                <Router>
                    <Header />
                </Router>
            </Layout>
        );
}