import {LoginReturn} from "@/app/(utils)/types/auth";
import {Dispatch, SetStateAction} from "react";
import {authType, pages} from "@/app/(utils)/types/home";


const Login = async (username: string, password: string): Promise<LoginReturn> => {
    const response = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({username, password})
    })
    
    return {code: response.status, auth: await response.json()}
}

const Refresh = async (refreshToken: string): Promise<LoginReturn> => {
    const response = await fetch("/api/auth", {
        method: "PATCH",
        body: JSON.stringify({refreshToken})
    })
    
    return {code: response.status, auth: await response.json()}
}

const RefreshHandler = async (setAuth: Dispatch<SetStateAction<authType | undefined>>, setPage: Dispatch<SetStateAction<pages>>, refreshToken: string) => {
    const response = await Refresh(refreshToken)
    if (response.code === 200) {
        setAuth(response.auth)
        setPage("Home")
    }
}

export {Login, Refresh, RefreshHandler}