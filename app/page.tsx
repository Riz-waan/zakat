'use client'


import HomePage from "@/app/(pages)/home";
import {useEffect, useState} from "react";
import SettingsPage from "@/app/(pages)/settings";
import Navbar from "@/app/(components)/navbar";
import {authType, pages} from "@/app/(utils)/types/home";
import LoginPage from "./(pages)/login";
import {RefreshHandler} from "@/app/(utils)/auth";


export default function Home() {

    const [page, setPage] = useState<pages>('Loading');
    const [auth, setAuth] = useState<authType>();

    const onLoad = async () => {
        if (auth === undefined) {
            let refToken = localStorage.getItem("refreshToken");
            if (refToken) {
                const output = await RefreshHandler(refToken)
                if (output.success && output.auth) {
                    setAuth(output.auth)
                    setPage('Home')
                    return
                }
            }
            setPage('Login')
        }
    }

    useEffect(() => {
        onLoad()
    }, [])

    const Login = (auth: authType) => {
        setAuth(auth)
        localStorage.setItem("refreshToken", auth.refreshToken)
        setPage("Home")
    }

    const Logout = () => {
        setAuth(undefined)
        localStorage.removeItem("refreshToken")
        setPage("Login")
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            {page === 'Loading' && <p>The application is loading.</p>}
            {page === 'Home' && <HomePage/>}
            {page === 'Settings' && <SettingsPage logout={Logout}/>}
            {page === 'Login' && <LoginPage storeAuth={Login}/>}
            {(page === 'Home' || page === 'Settings') && <Navbar nav={page} setNav={setPage}/>}
        </main>
    )
}
