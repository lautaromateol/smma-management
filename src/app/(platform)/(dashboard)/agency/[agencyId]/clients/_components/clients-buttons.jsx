"use client"
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useOpenModal } from "@/hooks/use-open-modal";
import { ClientsForm } from "./clients-form";

export function ClientsButtons() {

  const { onOpen } = useOpenModal((state) => state)

  return (
    <>
      <Button
        onClick={() => onOpen("add-client-form")}
        variant="main"
        size="sm"
      >
        Add new client
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
