import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

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
            return NextResponse.json(
                {
                    accessToken: "coolAccessToken",
                    refreshToken: "coolRefreshToken"
                }
            )
        }
        throw new Error("Unexpected User");
    } catch (e) {
        return NextResponse.json({accessToken: "", refreshToken: ""}, {status: 403})
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json()
        if (body.refreshToken === "coolRefreshToken") {
            return NextResponse.json(
                {
                    accessToken: "coolAccessToken",
                    refreshToken: "coolRefreshToken"
                }
            )

        }
        throw new Error("Unexpected User");
    } catch (e) {
        return NextResponse.json({accessToken: "", refreshToken: ""}, {status: 403})
    }
}