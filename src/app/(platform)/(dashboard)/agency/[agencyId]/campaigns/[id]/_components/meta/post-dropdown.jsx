import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { Modal } from "@/components/modal";
import { MetaAddPostForm } from ".";
import { useOpenModal } from "@/hooks/use-open-modal";

export function PostDropdown({ data, post }) {

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
          onClick={() => onOpen(`edit-post-${post.id}-form`)}
          className="cursor-pointer"
        >
          Edit
          <DropdownMenuShortcut>
            <Pencil className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        {/* <DropdownMenuItem
          disabled={isDeleting}
          onClick={() => executeDelete({ id: post.id })}
          className="cursor-pointer"
        >
          Delete
          <DropdownMenuShortcut>
            <Trash className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem> */}
        {post.url && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Link
                href={post.url}
              >
                Post
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
      <Modal
        modalId={`edit-post-${post.id}-form`}
        title="Edit client"
        description={`Fill out the form fields to edit this ${post.platform} post`}
      >
        <MetaAddPostForm data={data} editValues={post} />
      </Modal>
    </DropdownMenu>
  )
}
