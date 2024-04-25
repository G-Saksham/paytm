"use client"
import { Card } from "@repo/ui/card"

export const P2PTransactions = ({
    transactions,
    title,
    userId
} : {
    transactions: {
        startTime: Date,
        amount: number,
        status: 'Success' | 'Failure',
        fromUserId: number,
        toUserId: number,
        toUserName: string,
        fromUserName: string
    }[],
    title: string,
    userId: number
}) => {

    if (!transactions.length) {
        return <Card title={title}>
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return (
        <Card title={title}>
            <div className="">
                {transactions.map((t, index) => (
                    <div className="px-1" key={index} >
                        {t.fromUserId === userId ? 
                            <div>
                                {t.status === "Success" ? 
                                    <div className="flex justify-between border-b m-2">
                                        <div className="flex justify-center flex-col">
                                            <div className="text-sm w-20">
                                                Rs {(t.amount / 100)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm">
                                                Initiated
                                            </div>
                                            <div className="text-slate-600 text-xs p-1 pl-0">
                                                {t.startTime.toLocaleTimeString('en-US')} {" "}
                                                {t.startTime.toDateString()}
                                            </div>
                                        </div>
                                        <div className="flex justify-center flex-col">
                                            <div  className="text-sm text-green-600">
                                                Transfer to:
                                            </div>
                                            <div className="flex justify-center text-sm">
                                                {t.toUserName}
                                            </div>
                                        </div>
                                    </div> 
                                    : 
                                    <div className="flex justify-between border-b m-2">
                                        <div className="flex justify-center flex-col">
                                            <div className="text-sm w-20">
                                                Rs {(t.amount / 100)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm">
                                                Initiated
                                            </div>
                                            <div className="text-slate-600 text-xs p-1 pl-0">
                                                {t.startTime.toLocaleTimeString('en-US')} {" "}
                                                {t.startTime.toDateString()}
                                            </div>
                                        </div>
                                        <div className="flex justify-center flex-col">
                                            <div  className="text-sm text-red-600">
                                                Transfer to:
                                            </div>
                                            <div className="flex justify-center text-sm">
                                                {t.toUserName}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        : null}
                        {t.toUserId === userId ?(
                            <div>
                                {t.status === "Success" ? 
                                    <div className="flex justify-between border-b m-2">
                                        <div className="flex justify-center flex-col">
                                            <div className="text-sm w-20 text-green-600">
                                                + Rs {(t.amount / 100)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm">
                                                Initiated
                                            </div>
                                            <div className="text-slate-600 text-xs p-1 pl-0">
                                                {t.startTime.toLocaleTimeString('en-US')} {" "}
                                                {t.startTime.toDateString()}
                                            </div>
                                        </div>
                                        <div className="flex justify-center flex-col">
                                            <div  className="text-sm">
                                                Received ...
                                            </div>
                                            <div className="flex justify-center text-sm">
                                                {t.fromUserName}
                                            </div>
                                        </div>
                                    </div> 
                                    : <div className="flex justify-between border-b m-2">
                                        <div className="flex justify-center flex-col">
                                            <div className="text-sm w-20 text-red-600">
                                                + Rs {(t.amount / 100)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm">
                                                Initiated
                                            </div>
                                            <div className="text-slate-600 text-xs p-1 pl-0">
                                                {t.startTime.toLocaleTimeString('en-US')} {" "}
                                                {t.startTime.toDateString()}
                                            </div>
                                        </div>
                                        <div className="flex justify-center flex-col">
                                            <div  className="text-sm">
                                                Received ...
                                            </div>
                                            <div className="flex justify-center text-sm">
                                                {t.fromUserName}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>) 
                        : null}
                    </div>
                ))}
            </div>
        </Card>
    )
}