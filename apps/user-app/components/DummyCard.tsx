"use client"

import { Card } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import axios from "axios"

export type Status = 'Processing' | 'Success' | 'Failure'

export const DummyCard = ({
    transactions
}: {
    transactions: {
        id: number;
        status: 'Success' | 'Processing' | 'Failure';
        token: string;
        provider: string;
        amount: number;
        startTime: Date;
        userId: number;
    }[]
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
    // no need of this feature as (user never revert here if pending transactions are zero)
    if (!transactions.length) {
        return <Card title="Pending Transactions">
            <div className="text-center pb-8 pt-8">
                No Pending transactions
            </div>
        </Card>
    }

    return (
        <Card title = "Pending Transactions">
            <div>
                {transactions.map((t, index) => t.status === "Processing" ?
                    <div key={index} className="flex justify-between border-b p-2" >
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
                                {t.startTime.toDateString()}
                            </div>
                        </div>
                        <div className="flex justify-center gap-2">
                            <Button type="submit" onClick={async () => {
                                console.log("approved")
                                await webhookConnector(t.token, t.userId, t.amount)
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
    )
}