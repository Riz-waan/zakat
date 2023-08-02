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

const RefreshHandler = async ( refreshToken: string) => {
    const response = await Refresh(refreshToken)
    if (response.code === 200) {
        return {
            success: true,
            auth: response.auth
        }
    }
    return {
        success: false,
        auth: null
    }
}

export {Login, Refresh, RefreshHandler}