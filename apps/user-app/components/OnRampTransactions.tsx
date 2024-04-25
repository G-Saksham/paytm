"use client"

import { Card } from "@repo/ui/card"
import { Status } from "./DummyCard"

export const OnRampTransactions = ({
    transactions,
    title
} : {
    transactions: {
        time: Date,
        amount: number,
        status: Status,
        provider: string
    }[],
    title: string
}) => {

    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title={title}>
        <div className="">
            {transactions.map((t, index) => (
                <div className="px-1" key={index} >
                    {t.status === "Processing" ? 
                        <div className="flex justify-between border-b m-2">
                            <div className="flex justify-center flex-col">
                                <div className="text-sm w-20">
                                    Rs. {(t.amount / 100)}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm">
                                    Initiated
                                </div>
                                <div className="text-slate-600 text-xs p-1 pl-0">
                                    {t.time.toLocaleTimeString('en-US')} {" "}
                                    {t.time.toDateString()}
                                </div>
                            </div>
                            <div className="flex justify-center flex-col">
                                <div  className="text-sm text-yellow-500">
                                    Pending ...
                                </div>
                            </div>
                    </div> : null
                    }
                    {t.status === "Success" ? 
                        <div key={index} className="flex justify-between border-b m-2">
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
                                    {t.time.toLocaleTimeString('en-US')} {" "}
                                    {t.time.toDateString()}
                                </div>
                            </div>
                            <div className="flex justify-center flex-col">
                                <div  className="text-sm">
                                    Received...
                                </div>
                            </div>
                    </div> : null
                    }
                    {t.status === "Failure" ? 
                        <div key={index} className="flex justify-between border-b m-2">
                            <div className="flex justify-center flex-col">
                                <div className="text-sm w-20 text-red-600">
                                    Rs. {(t.amount / 100)}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm">
                                    Initiated
                                </div>
                                <div className="text-slate-600 text-xs p-1 pl-0">
                                    {t.time.toLocaleTimeString('en-US')} {" "}
                                    {t.time.toDateString()}                                   
                                </div>
                            </div>
                            <div className="flex justify-center flex-col">
                                <div  className="text-sm text-red-600">
                                    Failed txn..
                                </div>
                            </div>
                    </div> : null
                    }
                </div>
            )
            )}
        </div>
    </Card>
}