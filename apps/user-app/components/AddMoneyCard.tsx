"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import { useRouter } from "next/navigation";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "/dummywhserver"
}, {
    name: "Axis Bank",
    redirectUrl: "/dummywhserver"
}, {
    name: "Other",
    redirectUrl: "/dummywhserver"
}];

export const AddMoney = () => {
    const router = useRouter()
    const [amount, setAmount] = useState(0.00)
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "Default Bank")
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    return <Card title="Add Money">
        <div className="w-full">
            <TextInput type="number" label={"Amount"} placeholder={"Amount"} onChange={(value) => {
                setAmount(parseFloat(value) * 100)
            }} />
            <div className="py-4 text-left">
                Bank
            </div>
            <Select 
                onSelect={(value) => {
                    setProvider(value)
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                }} 
                options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))}
            />
            <div className="flex justify-center pt-4 gap-4">
                <Button onClick = {
                    async () => {
                        await createOnRampTransaction(provider, amount)
                        return null
                    }
                }> Add Money to Wallet
                </Button>
                <Button onClick = {() => {
                    router.push('/dummywhserver')
                }}> Pending requests
                </Button>
            </div>
        </div>
    </Card>
}