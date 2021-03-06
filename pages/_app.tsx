import "../styles/vendor.scss"
import "../styles/globals.scss"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { NextCookieProvider } from 'next-universal-cookie';
import { UserProvider } from '../contexts/User'
import Layout from "../components/Layout";
import axios from 'axios';
import Cookies from "js-cookie";
import { PageLoadingProvider } from "../contexts/PageLoading";

axios.interceptors.request.use(
    async (config) => {
        const token: string | undefined = Cookies.get('tk');

        if (token) {
            config.headers = {
                authorization: `Bearer ${token}`
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    if (error.response.status === 401) {
        window.location.replace("/");
    }
    return Promise.reject(error);
  });

axios.defaults.baseURL = "/api/";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <NextCookieProvider cookie={pageProps.cookie}>
                <UserProvider>
                    <PageLoadingProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </PageLoadingProvider>
                </UserProvider>
            </NextCookieProvider>
        </>
    )
}

export default MyApp
