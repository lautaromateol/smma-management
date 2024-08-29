"use client"
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useOpenModal } from "@/hooks/use-open-modal";
import { ClientsForm } from "./clients-form";

export default function ClientsButtons() {

  const { onOpen } = useOpenModal((state) => state)

  return (
    <div className="flex items-center gap-x-4">
      <div>
        Search
      </div>
      <div>
        Filter
      </div>
      <Button
        onClick={onOpen}
        variant="main"
        size="sm"
      >
        Add new client
      </Button>
      <Modal
        title="Add new client"
        description="Fill out the form fields to add a new client to your database"
      >
        <ClientsForm />
      </Modal>
    </div>
  )
}
