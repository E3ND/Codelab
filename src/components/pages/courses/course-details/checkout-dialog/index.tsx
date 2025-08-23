"use client";

import "react-credit-cards-2/dist/es/styles-compiled.css";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import PixIcon from "@/assets/pix.svg";
import { CreditCard } from "./credit-card";

type CheckoutDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    course: Course;
}

const paymentsMethods = [
    {
        label: "PIX",
        value: "PIX" as const,
        icon: PixIcon
    },
    {
        label: "Cartão de créditos",
        value: "CREDIT_CARD" as const,
        icon: CreditCard
    }
]

export const CheckoutDialog = ({ open, setOpen, course }: CheckoutDialogProps) => {
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<"PIX" | "CREDIT_CARD">("PIX");

    const handleContinue = () => {
        setStep(2);
    }

    return (
        <Dialog 
            open={open}
            setOpen={setOpen}
            height="95vh"
            title="Concluir compra"
            preventOutsideClick
            content={
                <div className="pt-4">
                    { step === 1 && (
                        <div className="flex flex-col">
                            <h2 className="mb-3">Método de pagamento</h2>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {paymentsMethods.map((method) => (
                                    <Button 
                                        key={method.value}
                                        variant="outline"
                                        onClick={() => setPaymentMethod(method.value)}
                                        className={(cn(
                                            "h-auto w-full flex items-center p-4 justify-center gap-3 rounded-xl text-lg font-semibold disabled:opacity-50",
                                            paymentMethod === method.value && "!bg-primary/10 text-primary !border-primary hover:text-primary"
                                        ))}
                                    >
                                        {method.label}
                                    </Button>
                                ))}
                            </div>

                            <Button className="ml-auto mt-6" onClick={handleContinue}>
                                Continuar
                                <ArrowRight />
                            </Button>
                        </div>
                    ) }

                    { step === 2 && paymentMethod === "CREDIT_CARD" && (
                        <>
                            <CreditCard onBack={() => setStep(1)} />
                        </>
                    ) }

                    { step === 2 && paymentMethod === "PIX" && (
                        <>
                            <CreditCard onBack={() => setStep(1)} />
                        </>
                    ) }                    
                </div>
            }
        />
    )
}