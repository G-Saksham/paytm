import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

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

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        take: 9,
        where: {
            userId: Number(session?.user?.id)
        },
        orderBy: {
            id: "desc"
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = (await getOnRampTransactions());

    return <div className="w-screen">
        <div className="text-3xl text-vi ml-2 mt-6 mb-4 font-semibold">
            Add to Wallet
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-4">
                <AddMoney />
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                </div>
            </div>
            <div>
                <div className="grid">
                    <OnRampTransactions transactions={transactions} title="Recent Wallet Transactions"/>
                </div>
            </div>
        </div>
    </div>
}