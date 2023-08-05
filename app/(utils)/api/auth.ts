import { authType } from "../types/home"

type LoginReturn = {
    code: number,
    auth: authType
}
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

const jwtOptions = {
    secret: new TextEncoder().encode(process.env.JWT_SECRET as string),
    alg: 'HS256',
    issuer: process.env.JWT_ISSUER as string,
    audience: process.env.JWT_AUDIENCE as string,
    accessTokenExpiration: process.env.JWT_ATEXPIRE as string,
    refreshTokenExpiration: process.env.JWT_RTEXPIRE as string
}

export {Login, Refresh, RefreshHandler, jwtOptions}