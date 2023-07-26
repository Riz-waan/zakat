'use client'

type cardInput = {
    account: string,
    value: number,
    type: 'Investment' | 'Checking' | 'Savings' | 'Cash'
}


export default function Card(props: cardInput) {
    return (
        <div className="flex items-center w-full justify-between px-8 mb-8 pb-4 border-slate-700 border-b-2">
            <div>
                <p className="font-bold text-md">{props.account}</p>
                <p className="font-light text-sm">{props.type}</p>
            </div>
            <p className="text-lg">${props.value}</p>
        </div>
        )
}