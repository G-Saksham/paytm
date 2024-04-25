import express from "express";
import prisma from "@repo/db/client";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors())
app.use(express.json())

app.get("/anyBankWebhook", async (req, res) => {
    res.json({mgs: "Hi there!, dummy webhook server runs fine."})
})

app.post("/anyBankWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string,
        userId: number,
        amount: number
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await prisma.$transaction([
            prisma.balance.upsert({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                update: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                },
                create: {
                    userId: Number(paymentInformation.userId),
                    amount: Number(paymentInformation.amount),
                    locked: 0
                }

            }),
            prisma.onRampTransaction.update({
                where: {
                    token: paymentInformation.token,
                    status: "Processing"
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);
        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.delete("/anyBankWebhook", async (req, res) => {
    const token : string = req.body.token
    try{
        await prisma.onRampTransaction.update({
            where: {
                token: token,
                status: "Processing"
            }, 
            data: {
                status: "Failure",
            }
        })
        res.json({message: "Request Cancelled"})
    } catch (e) {
        res.status(411).json(e)
    }
})

app.listen(PORT, () => {
    console.log(`Dummy bank webhook server is listening on port ${PORT}`)
});