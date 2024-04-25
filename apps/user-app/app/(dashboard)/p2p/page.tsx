import { BalanceCard } from "../../../components/BalanceCard"
import { SendCard } from "../../../components/SendCard"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { P2PTransactions } from "../../../components/P2PTransactions"

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

async function getP2PTransactions() {
    const userId = await getUserInfo()
    const txns = await prisma.p2PTransaction.findMany({
        take: 8,
        where: {
            OR: [
                {fromUserId: Number(userId)},
                {toUserId: Number(userId)}
            ]
        },
        orderBy: {
            id: "desc"
        }
    });
    return txns;   
}

const getUserInfo = async () => {
    const session = await getServerSession(authOptions)
    return session?.user.id
}

export default async () => {
    const balance = await getBalance();
    const transactions = (await getP2PTransactions()).reverse();
    const userId = Number(await getUserInfo())
    return (
        <div className="w-screen">
            <div className="text-3xl text-vi ml-2 mt-6 mb-4 font-semibold" >
                P2P Transfer
            </div>
            <div className="grid grid-col gap-4 md:grid-cols-2">
                <div className="grid gap-4">
                    <SendCard />
                    <div>
                        <BalanceCard amount={balance.amount} locked={balance.locked } />
                    </div>
                </div>
                <div className="grid">
                    <P2PTransactions userId={userId} transactions={transactions} title="Recent P2P Transactions"/>
                </div>
            </div>
        </div>
    )
}