import React, { PropsWithChildren, useEffect, useState } from "react";
import { PageLoadingContext as PageLoadingContextType } from "../@types";

export const PageLoadingContext = React.createContext<PageLoadingContextType>({
    isPageLoading: true,
    setIsPageLoading: () => { },
});

export const PageLoadingProvider = (props: PropsWithChildren<{}>) => {
    const [isPageLoading, setIsPageLoading] = useState(true)

    useEffect(() => {
        console.log(isPageLoading);

    }, [isPageLoading])

    return (
        <PageLoadingContext.Provider value={{ isPageLoading, setIsPageLoading }}>
            {props.children}
        </PageLoadingContext.Provider>
    );
};