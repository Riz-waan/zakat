type cardInput = {
    account: string,
    value: number,
    type: 'Investment' | 'Checking' | 'Savings' | 'Cash'
}


export default function Card({account, value, type}: cardInput) {

    let title: string = account
    let subtitle: string = type

    if (subtitle === 'Gold' || subtitle === 'Silver' || subtitle === 'Cash') {
        subtitle = title
        title = type
    }

    return (
        <div className="flex items-center w-full justify-between px-8 mb-4 pb-4 ">
            <div>
                <p className="font-bold text-sm">{title}</p>
                <p className="font-light text-sm text-slate-600">{subtitle}</p>
            </div>
            <p className="text-md font-light text-slate-800">{ new Intl.NumberFormat("en-US", { style: "currency", "currency":"USD" }).format(value)}</p>
        </div>
        )
}