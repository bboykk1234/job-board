import '../styles/vendor.scss'
import '../styles/globals.scss'
import '@popperjs/core';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { NextCookieProvider, useCookie } from 'next-universal-cookie';
import { UserProvider } from '../contexts/User'
import Layout from "../components/Layout";
import axios from 'axios';
import Cookies from "js-cookie";

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

axios.defaults.baseURL = "/api/";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <NextCookieProvider cookie={pageProps.cookie}>
                <UserProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </UserProvider>
            </NextCookieProvider>
        </>
    )
}

export default MyApp
