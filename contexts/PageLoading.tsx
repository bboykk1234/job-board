import React, { PropsWithChildren, useState } from "react";
import { PageLoadingContext as PageLoadingContextType } from "../@types";

export const PageLoadingContext = React.createContext<PageLoadingContextType>({
    isPageLoading: true,
    setIsPageLoading: () => { },
});

export const PageLoadingProvider = (props: PropsWithChildren<{}>) => {
    const [isPageLoading, setIsPageLoading] = useState(true)

    return (
        <PageLoadingContext.Provider value={{ isPageLoading, setIsPageLoading }}>
            {props.children}
        </PageLoadingContext.Provider>
    );
};