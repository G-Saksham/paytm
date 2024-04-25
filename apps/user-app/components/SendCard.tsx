"use client"

import {Card} from "@repo/ui/card"
import { TextInput } from "@repo/ui/textinput"
import { Button } from "@repo/ui/button"
import { useState } from "react"
import { p2ptxn } from "../app/lib/actions/p2ptxn"


export const SendCard = () => {
    const [number, setNumber] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)

    return (
        <Card title="Transfer Money">
            <TextInput label="Send's Number" placeholder="Phone Number" onChange={(value)=>{setNumber(parseInt(value).toString())}} />
            <TextInput label="Amount" placeholder="Rs. 100.00" onChange={(value)=>{setAmount(parseFloat(value) * 100)}} />
            <div className="flex justify-center my-4">
                <Button onClick={async () => {
                    await p2ptxn(Number(number), amount)
                }}> Send Money</Button>
            </div>
        </Card>
    )
}