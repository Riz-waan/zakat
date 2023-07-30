import { Dispatch, SetStateAction } from "react"
import {pages} from "@/app/(utils)/types/home";

export type NavLinkInput = {
    route: pages
    current: pages
    setCurrent: Dispatch<SetStateAction<pages>>
}