"use client"
import Link from "next/link";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useOpenModal } from "@/hooks/use-open-modal";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { CampaignsForm } from ".";
import { usePathname } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { deleteCampaign } from "@/actions/delete-campaign";
import { toast } from "sonner";

export function CampaignDropdown({ campaign }) {

  const { onOpen } = useOpenModal((state) => state)

  const { execute, isPending } = useAction(deleteCampaign, {
    onSuccess: () => toast.success("Campaign deleted successfully!"),
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
          onClick={() => onOpen(`edit-campaign-${campaign.id}-form`)}
          className="cursor-pointer"
        >
          Edit
          <DropdownMenuShortcut>
            <Pencil className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => execute({ id: campaign.id, client_id: campaign.clientId })}
          className="cursor-pointer"
        >
          Delete
          <DropdownMenuShortcut>
            <Trash className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href={`${pathname}/${campaign.id}`}>View in detail</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Modal
        modalId={`edit-campaign-${campaign.id}-form`}
        title="Edit campaign"
        description="Fill out the form fields to edit this campaign from your database"
      >
        <CampaignsForm editValues={campaign} />
      </Modal>
    </DropdownMenu>
  )
}
