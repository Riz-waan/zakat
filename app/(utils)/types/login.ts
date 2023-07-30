import { authType } from "./home"

export type loginPageInput = {
    storeAuth: (auth: authType) => void
}