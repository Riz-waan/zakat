import {settingsPageInput} from "@/app/(utils)/types/settings";

export default function SettingsPage({logout}: settingsPageInput) {
    return (
        <div className="w-full pt-8 flex flex-col items-center">
            <h1>Settings</h1>
            <button className="select-none bg-sky-400 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white" onClick={logout}>Logout</button>
        </div>
    )
}