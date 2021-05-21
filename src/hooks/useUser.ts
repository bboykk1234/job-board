import React, { useEffect, useState } from "react";
import { UserLogin, UserProfile } from "../../@types";
import { useCookies } from "react-cookie";
import axios, { AxiosResponse } from "axios";

export const useUser = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoggedIn, setIsLoggedin] = useState<boolean | null>(null);
    const [cookies, setCookie, removeCookie] = useCookies(["tk"]);

    useEffect(() => {
        if (!cookies.tk) {
            setIsLoggedin(false);
            return;
        }

        setUserBasedOnToken();
    }, [cookies.tk]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    async function setUserBasedOnToken() {
        try {
            const res = await axios.get<any, AxiosResponse<UserProfile>>("/auth/users");
            setUser(res.data);
            setIsLoggedin(true);
        } catch (err) {
            console.log(err);
            removeCookie("tk");
        }
    }

    async function login({ username, password }: UserLogin) {
        try {
            const res = await axios.post("/auth/login", {
                username,
                password
            });

            const expires = new Date();
            expires.setHours(expires.getHours() + 1);
            if (res.data.token) {
                setCookie('tk', res.data.token, { expires });
                return;
            }
        } catch (err) {
            console.log(err);
            removeCookie('tk');
        }
    }

    function logout() {
        removeCookie("tk");
        setUser(null);
        setIsLoggedin(false);
    }

    return {
        user,
        isLoggedIn,
        login,
        logout,
    };
}