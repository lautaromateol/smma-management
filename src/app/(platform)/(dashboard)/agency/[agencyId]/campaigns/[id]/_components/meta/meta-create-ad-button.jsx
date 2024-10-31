"use client"
import { Megaphone } from "lucide-react";
import { useOpenModal } from "@/hooks/use-open-modal";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";
import { MetaAdForm } from ".";

export function MetaCreateAdButton({ data }) {

    const { onOpen } = useOpenModal((state) => state)

    return (
        <>
            <Button
                onClick={() => onOpen("meta-create-ad-form")}
                className="flex items-center font-medium gap-x-2 col-span-2"
                variant="outline"
            >
                Create Ad
                <Megaphone className="size-4" />
            </Button>
            <Modal
                title="Create an new ad for this campaign"
                modalId="meta-create-ad-form"
            >
                <MetaAdForm /> 
            </Modal>
        </>
    )
}