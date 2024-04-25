// "use client"

import { DummyCard } from "../../../components/DummyCard"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client"
import { BalanceCard } from "../../../components/BalanceCard";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
        token: t.token
    }))
}

async function getUserInfo() {
    const session = await getServerSession(authOptions)
    const user = session?.user
    return user
}

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

export default async function () {
    const balance = await getBalance();
    const transactions = (await getOnRampTransactions()).reverse();
    const user = await getUserInfo()

    return (
        <div className="p-4 w-screen">
            <div className="text-3xl text-vi m-2 mt-0 font-semibold">
                Dummy Bank Server
            </div>
            <div className="flex justify-end m-2 mt-0 mb-6 text-sm text-vi font-medium">
                <Link className="hover:underline" href="/dashboard">Go back to Dashboard</Link>
            </div>
            <div className="mb-4">
                {/* <BalanceCard amount={balance.amount} locked={balance.locked} /> */}
            </div>
            <div>
                <DummyCard transactions={transactions} user={user} key={user.id}/>
            </div>
        </div>
    )
}