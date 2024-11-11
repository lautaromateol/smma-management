import { Ellipsis, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { useOpenModal } from "@/hooks/use-open-modal";
import { useAction } from "@/hooks/use-action";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";
import { MetaAdSetForm } from "..";

export function AdSetDropdown({ adSet, data }) {

  const { onOpen } = useOpenModal((state) => state)

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
          onClick={() => onOpen(`edit-adset-${adSet.id}-form`)}
          className="cursor-pointer"
        >
          Edit
          <DropdownMenuShortcut>
            <Pencil className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
        >
          Delete
          <DropdownMenuShortcut>
            <Trash className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Modal
        modalId={`edit-adset-${adSet.id}-form`}
        title="Edit Ad Set"
      >
        <MetaAdSetForm data={data} editValues={adSet} />
      </Modal>
    </DropdownMenu >
  )
}