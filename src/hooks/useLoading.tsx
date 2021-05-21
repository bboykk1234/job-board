import { useState } from "react";

export default function useLoading(initialState: boolean = true) {
    const [isLoading, setIsLoading] = useState(initialState);

    return { isLoading, setIsLoading };
}