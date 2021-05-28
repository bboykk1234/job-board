import { useEffect, useState } from "react";
import { LoginFormFieldValues, UserProfile } from "../@types";
import { useCookie } from "next-universal-cookie";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";

export const useUser = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoggedIn, setIsLoggedin] = useState<boolean | null>(null);
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookie(["tk"]);

    useEffect(() => {
        if (!cookies.tk) {
            setIsLoggedin(false);
            return;
        }

        if (!removeCookie) {
            return;
        }

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

        setUserBasedOnToken();
    }, [cookies.tk, removeCookie]);

    async function login({ username, password }: LoginFormFieldValues) {
        try {
            const res = await axios.post("/auth/login", {
                username,
                password
            });

            const expires = new Date();
            expires.setDate(expires.getDate() + 7);
            if (res.data.token) {
                setCookie('tk', res.data.token, { expires, path: "/" });
                return true;
            }
        } catch (err) {
            console.log(err);
            removeCookie('tk');
        }
        return false;
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