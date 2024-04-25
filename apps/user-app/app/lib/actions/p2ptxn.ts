"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from '@repo/db/client'

export const p2ptxn = async (toUserNumber: number, amount: number) => {
    const session = await getServerSession(authOptions);
    const fromUserId = Number(session?.user.id)

    const fromUser = await prisma.user.findUnique({
        where: {id: fromUserId}
    })

    try {
        const toUser = await prisma.user.findUnique({
            where: {
                number: toUserNumber.toString()
            }
        })

        if(!toUser) {
            throw new Error('No user found with such number')
        }

        await prisma.$transaction(async (txn) => {
            await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUserId)} FOR UPDATE`
            const fromUserBalance = await txn.balance.findUnique({
                where: {
                    userId: fromUserId
                }
            })
            if(!fromUserBalance || fromUserBalance.amount < amount || amount < 0) {
                throw new Error('Insufficent Balance')
            }
            await txn.balance.update({
                where: {userId: fromUserId},
                data: {
                    amount: {decrement: Number(amount)}
                }
            })
            await txn.balance.update({
                where: {userId: toUser.id},
                data: {
                    amount: {increment: Number(amount)}
                }
            })
        })

        await prisma.p2PTransaction.create({
            data: {
                status: "Success",
                startTime: new Date(),
                fromUserId: fromUserId,
                toUserId: toUser.id,
                amount: amount,
                toUserName: toUser.name,
                fromUserName: fromUser?.name
            }
        })
        return Response.json({
            message: "Successfully Transfer"
        })

    } catch (e) {
        console.log(e)
        return Response.json(e)
    }
}