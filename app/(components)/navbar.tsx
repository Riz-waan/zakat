import {pages} from "@/app/(utils)/types/home";
import {Dispatch, SetStateAction} from "react";
import NavLink from "@/app/(components)/navlink";

type navInput = {
    nav: pages
    setNav: Dispatch<SetStateAction<pages>>
}

export default function Navbar({nav, setNav} : navInput) {
    return (
        <div className="border-t-2 w-full p-4 justify-around flex">
            <NavLink current={nav} setCurrent={setNav} route="Home"/>
            <NavLink current={nav} setCurrent={setNav} route="Settings"/>
        </div>
    )
}