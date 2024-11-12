"use client"
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useOpenModal } from "@/hooks/use-open-modal";
import { ClientsForm } from "./clients-form";
import { User } from "lucide-react";

export function ClientsButtons() {

  const { onOpen } = useOpenModal((state) => state)

  return (
    <>
      <Button
        className="flex items-center justify-center gap-x-1"
        onClick={() => onOpen("add-client-form")}
        variant="main"
        size="sm"
      >
        Add new client
        <User className="size-5 text-white" />
      </Button>
      <Modal
        modalId="add-client-form"
        title="Add new client"
        description="Fill out the form fields to add a new client to your database"
      >
        <ClientsForm />
      </Modal>
    </>
  )
}
