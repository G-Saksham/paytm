"use server"

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export async function createOnRampTransaction(provider : string, amount: number ) {
    const session = await getServerSession(authOptions) 
    const userId = Number(session?.user.id)
    try {
        if(amount < 0) {
            return null
        }

        await prisma.onRampTransaction.create({
            data: {
                status: "Processing",
                token: `${(Math.random() * 10000)}`,
                provider: provider,
                amount: Number(amount),
                startTime: new Date(),
                userId: Number(userId)
            }
        })
        return Response.json({msg: "Done"})
    } catch(e) {
        return Response.json(e)
    }
}