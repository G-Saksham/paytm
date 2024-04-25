import Link from "next/link";
import { Card } from "@repo/ui/card";
import { BalanceCard } from "../../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

const getBalance = async() => {
    const session = await getServerSession(authOptions)
    const userId = Number(session?.user?.id)

    const balance = await prisma.balance.findUnique({
        where: {userId: userId}
    })
    return balance
}

export default async function() {
    const balance = await getBalance()

    return <div className="w-screen">
        <div className="text-3xl text-vi ml-2 mt-6 mb-4 font-semibold">
            Dashboard
        </div>
        <div className="grid gap-4 ">
            <BalanceCard amount={balance?.amount || 0} locked={balance?.locked || 0}/>
            <Card title="Project Discription">
                <div className="p-2">
                    Features:
                    <ul className="list-disc p-4 pt-1">
                        <li>User can add money to wallet
                            <ul className="list-disc px-3 text-gray-500">
                                <li>Confirm wallet transactions via Dummy bank webhook server</li>
                            </ul>
                        </li>
                        <li>User can see the wallet balance</li>
                        <li>User can send money via wallet to other users wallet via phone number</li>
                        <li>User can track the transactions</li>
                    </ul>
                </div>
            </Card>  
        </div>
        <div className="flex justify-center m-8 text-xs">
            <div className="flex flex-col text-slate-600">
                -----  Made By Saksham Gupta, inspired by PayTM App  ----- 
                <Link href="https://github.com/G-Saksham/adv_paytm_project" className="flex justify-center hover:underline">Get the source code</Link>
            </div>          
        </div>
    </div>
}