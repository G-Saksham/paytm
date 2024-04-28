import { NextResponse } from "next/server"
import prisma from "@repo/db/client";

export const GET = async () => {
    await prisma.merchant.create({
        data: {
            email: `${Math.random()}@gmail.com`,
            name: "adsads",
            auth_type: "Google",
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}