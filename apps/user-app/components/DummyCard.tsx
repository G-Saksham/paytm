"use client"

import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { Button } from "@repo/ui/button"
import { Children } from "react"
import axios from "axios"
import { headers } from "next/headers"

export type Status = 'Processing' | 'Success' | 'Failure'

export const DummyCard = ({
    transactions, user
}: {
    transactions: {
        time: Date,
        amount: number,
        status: Status,
        provider: string,
        token: string
    }[],
    user : {
        id: number,
        name: string,
        number: string,
    }
}) => {

    const webhookConnector = async (token: string, user_identifier: number, amount: number) => {
        try {
            await axios.post("http://localhost:8080/anyBankWebhook",{
                token: token,
                user_identifier: user_identifier,
                amount: amount
            })
            return Response.json({msg: "successfully update tranfer"})
        } catch (e) {
            return Response.json(e)
        }
    }

    const cancelRequest = async (token: string) => {
        try {
            await axios.delete("http://localhost:8080/anyBankWebhook", {
                data: {
                    token: token
                }
            })
        } catch (e) {
            return Response.json(e)
        }
    }
    // no need of this feature as (user never reveet here if pending transactions are zero)
    if (!transactions.length) {
        return <Card title="Pending Transactions">
            <div className="text-center pb-8 pt-8">
                No Pending transactions
            </div>
        </Card>
    }

    return (
        <div className="" >
            <Card title = "Pending Transactions">
                <div className="">
                    {transactions.map((t, index) => t.status === "Processing" ?
                        <div key={t.token} className="flex justify-between border-b p-2" >
                            <div className="flex flex-col justify-center text-left w-1/3">
                                <div className=" text-md">
                                    Rs. {(t.amount / 100)}
                                </div>
                            </div>
                            <div className="flex flex-col justify-left text-left w-1/3">
                                <div className="text-sm">
                                    Initaited at
                                </div>
                                <div className="text-slate-600 text-sm">
                                    {t.time.toDateString()}
                                </div>
                            </div>
                            <div className="flex justify-center gap-2">
                                <Button type="submit" onClick={async () => {
                                    console.log("approved")
                                    await webhookConnector(t.token, user.id, t.amount)
                                }}> Approved
                                </Button>
                                <Button type="cancel" onClick={async () => {
                                    console.log("Cancelled")
                                    await cancelRequest(t.token)
                                }}> Cancel
                                </Button>
                            </div>
                        </div>
                    : null)}
                </div>
            </Card>
        </div>
    )
}