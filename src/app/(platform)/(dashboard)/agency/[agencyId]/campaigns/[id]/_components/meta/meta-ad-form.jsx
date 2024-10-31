"use client"
import { cloneElement, useState } from "react"
import { MessageSquare, FlaskConical, Facebook, Instagram, Megaphone, Phone, MapPin, MousePointerClick, Globe, IdCard } from 'lucide-react';

const goals = [
    {
        goal: "Get More Messages",
        description: null,
        icon: <MessageSquare />
    },
    {
        goal: "Create A/B Test",
        description: null,
        icon: <FlaskConical />
    },
    {
        goal: "Boost Facebook Content",
        description: "Get more people to see and engage with your Page posts",
        icon: <Facebook />
    },
    {
        goal: "Boost an Instagram Post or Reel",
        description: null,
        icon: <Instagram />
    },
    {
        goal: "Promote Your Page",
        description: null,
        icon: <Megaphone />
    },
    {
        goal: "Get More Calls",
        description: null,
        icon: <Phone />
    },
    {
        goal: "Promote Your Business Locally",
        description: "Connect with people nearby",
        icon: <MapPin />
    },
    {
        goal: "Get More Button Clicks",
        description: "Create an ad that includes the call-to-action button from your Page",
        icon: <MousePointerClick />
    },
    {
        goal: "Get More Website Visitors",
        description: "Create an ad to send people to your website",
        icon: <Globe />
    },
    {
        goal: "Get more Leads",
        description: "Create an ad to request contact details from potential customers",
        icon: <IdCard />
    }
];


export function MetaAdForm() {

    const [step, setStep] = useState(1)

    if (step === 1) {
        return (
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Choose a goal</h2>
                <div className="grid grid-cols-4 gap-2">
                    {goals.map(({ goal, description, icon }, i) => (
                        <AddGoalCard
                            key={i}
                            goal={goal}
                            description={description}
                            icon={icon}
                        />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div></div>
    )
}

function AddGoalCard({ goal, description, icon }) {
    return (
        <div
            role="button"
            className="flex flex-col space-y-2 py-6 px-4 shadow rounded-md"
        >
            <div className="grid place-content-center size-12 p-4 rounded-full bg-muted">
                {cloneElement(icon, { className: "size-8" })}
            </div>
            <p className="text-base font-semibold">
                {goal}
            </p>
            {description && <p className="text-sm font-light">
                {description}
            </p>}
        </div>
    )
}