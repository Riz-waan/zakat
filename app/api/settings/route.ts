import {NextRequest, NextResponse} from "next/server"
import {jwtOptions} from "@/app/(utils)/auth";
import * as jose from "jose"
import {kv} from "@vercel/kv";
import {KVDataStore, SettingsAPIReturn} from "@/app/(utils)/types/settings";

async function pullAccountBalance(accessToken: string) {
    return 0
}

export async function GET(request: NextRequest) {
    try {
        const body = await request.json()
        const {payload} = await jose.jwtVerify(body.refreshToken, jwtOptions.secret, {
            issuer: jwtOptions.issuer,
            audience: jwtOptions.audience
        })

        if (payload.type === "accessToken") {

            const userInfo: KVDataStore = await kv.json.get(payload.username as string)

            const settingsResult: SettingsAPIReturn[] = [];

            for (const account of userInfo.accounts) {
                let accountInfo = ""
                let accountValue = 0
                if (account.type === 'Investment' || account.type === 'Checking' || account.type === 'Savings') {
                    accountInfo = account.bank
                    accountValue = await pullAccountBalance(account.accessToken)
                } else if (account.type === 'Gold' || account.type === 'Silver') {
                    accountInfo = account.type
                    accountValue = account.valueInGrams
                } else if (account.type === 'Cash') {
                    accountInfo = account.currency
                    accountValue = account.value
                }


                settingsResult.push({
                    type: account.type,
                    account: accountInfo,
                    value: accountValue,
                    uniqueId: account.uniqueId

                })
            }
            return NextResponse.json(settingsResult)
        }
        return NextResponse.json({accessToken: "", refreshToken: ""}, {status: 403})
    } catch (e) {
        return NextResponse.json({accessToken: "", refreshToken: ""}, {status: 403})
    }
}