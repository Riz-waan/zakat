import { useState } from "react"
import { Login } from "../(utils)/api/auth"
import { authType } from "../(utils)/types/home"

type loginPageInput = {
    storeAuth: (auth: authType) => void
}

export default function LoginPage({storeAuth}: loginPageInput) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const Submit = async () => {
        setLoading(true)
        const response = await Login(username, password)
        if (response.code !== 200) {
            setError(true)
            setLoading(false)
        }else{
            setError(false)
            setLoading(false)
            storeAuth(response.auth)
        }
        
    }
    
    return (
        <div className="w-full max-w-xs">
            <form className="p-8 pt-6 pb-8 mb-4">
                <p className="font-bold text-xl text-gray-700 mb-8">Zakat App</p>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="*******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-xs italic">Credentials is invalid. Please try again.</p> }
                    </div>
                <div className="flex items-center justify-between">
                    {loading ? <div className="select-none bg-sky-300 text-white font-bold py-2 px-4 rounded">Loading</div> : <button className="select-none bg-sky-400 text-white font-bold py-2 px-4 rounded" type="button" onClick={Submit}>Sign In</button>}
                </div>
            </form>
        </div>
    )
}