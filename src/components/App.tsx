import { useContext } from 'react';
import { UserContext } from '../contexts/User';
import Layout from './Layout';
import Router from "./Router";
import Header from "./Header";

export default function App() {
    const { isLoggedIn } = useContext(UserContext);

    return isLoggedIn === null
        ? (
            <Layout>Loading...</Layout>
        ) : (
            <Layout>
                <Router>
                    <Header />
                </Router>
            </Layout>
        );
}