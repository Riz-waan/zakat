import { Dispatch, SetStateAction } from "react"
import { pages } from "../(utils)/types/home"

type NavLinkInput = {
    route: pages
    current: pages
    setCurrent: Dispatch<SetStateAction<pages>>
}
export default function NavLink({route, current, setCurrent} : NavLinkInput) {
    return(
        <button onClick={() => {setCurrent(route)}} className={route === current ? "text-sky-400 underline underline-offset-8 select-none" : "select-none"}>{route}</button>
    )
}