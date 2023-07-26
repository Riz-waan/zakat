'use client'

import Card from "@/app/(components)/card";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-8">
            <div className="mb-32 w-full">
                <h2 className='mb-8 text-2xl font-semibold'>
                    My Net Worth
                </h2>
                <Card account={"Charles Schwab"} value={56900.96} type={"Investment"}/>
                <Card account={"Charles Schwab"} value={56900.96} type={"Checking"}/>
                <Card account={"HSBC"} value={56900.96} type={"Checking"}/>
                <Card account={"Cash"} value={500.01} type={"Cash"} />
            </div>
        </main>
    )
}
