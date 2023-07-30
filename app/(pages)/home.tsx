
import Card from "@/app/(components)/card";

export default function HomePage() {
    return (
        <div className="w-full pt-8">
            <Card account={"Charles Schwab"} value={56900.96} type={"Investment"}/>
            <Card account={"Charles Schwab"} value={56900.96} type={"Checking"}/>
            <Card account={"HSBC"} value={56900.96} type={"Checking"}/>
            <Card account={"US Dollars"} value={500} type={"Cash"} />
            <Card account={"500g"} value={250} type={"Gold"} />
        </div>
        )
}