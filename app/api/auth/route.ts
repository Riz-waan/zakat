import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import * as jose from "jose"
import {authType} from '@/app/(utils)/types/home';
import {kv} from '@vercel/kv';

import crypto from "crypto";
import {KVDataStore} from "@/app/(utils)/types/settings";
import {jwtOptions} from "@/app/(utils)/api/auth";

function passwordCompare(password: string, saltHashedPassword: string) {
    const salt = saltHashedPassword.split(".")[0];
    const hashedPassword = crypto
        .createHmac("sha512", salt)
        .update(password)
        .digest("hex");
    return `${salt}.${hashedPassword}` === saltHashedPassword;
}
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const user: KVDataStore = await kv.json.get(body.username)
        if (user && passwordCompare(body.password, user.password)) {
            const generatedTokens = await generateTokens(body.username)

            return NextResponse.json(
                {
                    accessToken: generatedTokens.accessToken,
                    refreshToken: generatedTokens.refreshToken
                }
            )
        }
        return NextResponse.json({accessToken: "", refreshToken: ""}, {status: 403})
    } catch (e) {
        return NextResponse.json({accessToken: "", refreshToken: ""}, {status: 403})
    }
}




export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json()
        const {payload} = await jose.jwtVerify(body.refreshToken, jwtOptions.secret, {
            issuer: jwtOptions.issuer,
            audience: jwtOptions.audience
        })

        if (payload.type === "refreshToken") {

            const generatedTokens = await generateTokens(payload.username as string)

            return NextResponse.json(
                {
                    accessToken: generatedTokens.accessToken,
                    refreshToken: generatedTokens.refreshToken
                }
            )

        }
        return NextResponse.json({accessToken: "", refreshToken: ""}, {status: 403})
    } catch (e) {
        return NextResponse.json({accessToken: "", refreshToken: ""}, {status: 403})
    }
}


const generateTokens = async (username: string): Promise<authType> => {

    const accessToken = await new jose.SignJWT({username, type: "accessToken"})
        .setProtectedHeader({alg: jwtOptions.alg})
        .setIssuedAt()
        .setIssuer(jwtOptions.issuer)
        .setAudience(jwtOptions.audience)
        .setExpirationTime(jwtOptions.accessTokenExpiration)
        .sign(jwtOptions.secret)

    const refreshToken = await new jose.SignJWT({username, type: "refreshToken"})
        .setProtectedHeader({alg: jwtOptions.alg})
        .setIssuedAt()
        .setIssuer(jwtOptions.issuer)
        .setAudience(jwtOptions.audience)
        .setExpirationTime(jwtOptions.refreshTokenExpiration)
        .sign(jwtOptions.secret)

    return {accessToken, refreshToken}
}