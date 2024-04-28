// "use client"

import { DummyCard } from "../../../components/DummyCard"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client"
import Link from "next/link";

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

export default async function () {
    const transactions = (await getOnRampTransactions()).reverse();

    return (
        <div className="p-4 w-screen">
            <div className="text-3xl text-vi m-2 mt-0 font-semibold">
                Dummy Bank Server
            </div>
            <div className="flex justify-end m-2 mt-0 mb-6 text-sm text-vi font-medium">
                <Link className="hover:underline" href="/dashboard">Go back to Dashboard</Link>
            </div>
            <div>
                <DummyCard transactions={transactions}/>
            </div>
        </div>
    )
}