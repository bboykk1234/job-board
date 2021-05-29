import React, { useContext, useEffect } from 'react';
import { PageLoadingContext } from '../contexts/PageLoading';
import Header from "./Header";
import LoadSpinner from "./LoadSpinner";
import { useRouter } from "next/router";
import { UserContext } from '../contexts/User';

const Layout: React.FC = ({ children }) => {
    const router = useRouter();
    const { isLoggedIn } = useContext(UserContext)
    const { isPageLoading, setIsPageLoading } = useContext(PageLoadingContext)

    useEffect(() => {
        if (isLoggedIn === null) {
            return
        }

        // Non-loggedin user allow to go to login page
        if (isLoggedIn && ["/login"].includes(router.pathname)) {
            router.push("/")
            return
        }

        if (isLoggedIn === false && [
            "/applications",
            "/jobs/[id]/applications",
            "/jobs/new",
            "/jobs/edit",
        ].includes(router.pathname)
        ) {
            router.push("/")
            return
        }

        setIsPageLoading(false)
    }, [isLoggedIn, router.pathname])

    return (
        <div className="container-fuild d-flex flex-column h-100" style={{ minWidth: "1300px" }}>
            {isPageLoading
                ? (
                    <LoadSpinner />
                ) : (
                    <>
                        <Header />
                        {children}
                    </>
                )}
        </div>
    )
}

export default Layout