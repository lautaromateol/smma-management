import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { deleteClient } from "@/actions/delete-client";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useOpenModal } from "@/hooks/use-open-modal";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { ClientsForm } from "./clients-form";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function ClientDropdown({ client }) {

  const { onOpen } = useOpenModal((state) => state)

  const { execute: executeDelete, isPending: isDeleting } = useAction(deleteClient, {
    onSuccess: (data) => {
      toast.success(`Client "${data.name}" deleted successfully`)
    },
    onError: (error) => toast.error(error)
  })

  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
      >
        <Button
          variant="ghost"
        >
          <Ellipsis className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-4">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onOpen(`edit-client-${client.id}-form`)}
          className="cursor-pointer"
        >
          Edit
          <DropdownMenuShortcut>
            <Pencil className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isDeleting}
          onClick={() => executeDelete({ id: client.id })}
          className="cursor-pointer"
        >
          Delete
          <DropdownMenuShortcut>
            <Trash className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link
            href={`${pathname}/${client.id}`}
          >
            Client page
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Modal
        modalId={`edit-client-${client.id}-form`}
        title="Edit client"
        description="Fill out the form fields to edit this client from your database"
      >
        <ClientsForm editValues={client} />
      </Modal>
    </DropdownMenu>
  )
}
