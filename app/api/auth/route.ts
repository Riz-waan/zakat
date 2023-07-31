import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import * as jose from "jose"
import { authType } from '@/app/(utils)/types/home';
export function GET(request: NextRequest) {
    return NextResponse.json(
        {
            body: request.body,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200,
        },
    );
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        if (body.username === "user" && body.password === "password") {
            const generatedTokens = await generateTokens(body.username)

            return NextResponse.json(
                {
                    accessToken: generatedTokens.accessToken,
                    refreshToken: generatedTokens.refreshToken
                }
            )
        }
        throw new Error("Unexpected User");
    } catch (e) {
        return NextResponse.json({accessToken: "", refreshToken: ""}, {status: 403})
    }
}


const jwtOptions = {
    secret: new TextEncoder().encode('cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'),
    alg: 'HS256',
    issuer: 'rizco:zakat',
    audience: 'rizco:zakat',
    accessTokenExpiration: "2h",
    refreshTokenExpiration: "30s"
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json()
        const {payload } = await jose.jwtVerify(body.refreshToken, jwtOptions.secret, {
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
        throw new Error("Unexpected User");
    } catch (e) {
        return NextResponse.json({accessToken: "", refreshToken: ""}, {status: 403})
    }
}




const generateTokens = async (username: string): Promise<authType> => {

    const accessToken = await new jose.SignJWT({ username, type: "accessToken" })
  .setProtectedHeader({ alg: jwtOptions.alg })
  .setIssuedAt()
  .setIssuer(jwtOptions.issuer)
  .setAudience(jwtOptions.audience)
  .setExpirationTime(jwtOptions.accessTokenExpiration)
  .sign(jwtOptions.secret)

    const refreshToken = await new jose.SignJWT({ username, type: "refreshToken" })
  .setProtectedHeader({ alg: jwtOptions.alg })
  .setIssuedAt()
  .setIssuer(jwtOptions.issuer)
  .setAudience(jwtOptions.audience)
  .setExpirationTime(jwtOptions.refreshTokenExpiration)
  .sign(jwtOptions.secret)

    return {accessToken, refreshToken}
}