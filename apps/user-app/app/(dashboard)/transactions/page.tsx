import { OnRampTransactions } from "../../../components/OnRampTransactions"
import { P2PTransactions } from "../../../components/P2PTransactions";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";

async function getP2PTransactions() {
    const userId = await getUserInfo()
    const txns = await prisma.p2PTransaction.findMany({
        where: {
            OR: [
                {fromUserId: Number(userId)},
                {toUserId: Number(userId)}
            ]
        }
    });
    return txns;   
}

async function getOnRampTransactions(): Promise<{
    id: number;
    status: 'Success' | 'Processing' | 'Failure';
    token: string;
    provider: string;
    amount: number;
    startTime: Date;
    userId: number;
}[]> {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns
}

const getUserInfo = async () => {
    const session = await getServerSession(authOptions)
    return session?.user.id
}

export default async function() {
    const transactions = (await getOnRampTransactions()).reverse();
    const p2pTransactions = (await getP2PTransactions()).reverse();
    const userId = Number(await getUserInfo())

    return <div className="w-screen">
        <div className="text-3xl text-vi ml-2 mt-6 mb-4 font-semibold">
            Transactions
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
                <OnRampTransactions transactions={transactions} title="Recent Wallet Transactions"/>
            </div>
            <div className="">
                <P2PTransactions userId={userId} transactions={p2pTransactions} title="Recent P2P Transactions"/>
            </div>
        </div>
    </div>
}