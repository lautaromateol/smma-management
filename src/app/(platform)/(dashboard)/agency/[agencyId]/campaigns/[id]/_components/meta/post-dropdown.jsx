import Link from "next/link";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { useOpenModal } from "@/hooks/use-open-modal";
import { useAction } from "@/hooks/use-action";
import { deleteFacebookPost } from "@/actions/delete-facebook-post";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";
import { MetaAddPostForm, PostDetail } from ".";

export function PostDropdown({ post, data }) {

  const { onOpen } = useOpenModal((state) => state)

  const { execute, isPending } = useAction(deleteFacebookPost, {
    onSuccess: () => toast.success("Facebook post deleted successfully"),
    onError: (error) => toast.error(error)
  })

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
          disabled={post.platform === "INSTAGRAM"}
          onClick={() => onOpen(`edit-post-${post.post_id}-form`)}
          className="cursor-pointer"
        >
          Edit
          <DropdownMenuShortcut>
            <Pencil className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending || post.platform === "INSTAGRAM"}
          onClick={() => execute({ post_id: post.post_id, access_token: data.pageAccessToken })}
          className="cursor-pointer"
        >
          Delete
          <DropdownMenuShortcut>
            <Trash className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
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
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onOpen(`post-${post.post_id}-info`)}
          className="cursor-pointer"
        >
          View in detail
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Modal
        modalId={`edit-post-${post.post_id}-form`}
        title="Edit client"
        description={`Fill out the form fields to edit this ${post.platform} post`}
      >
        <MetaAddPostForm data={data} editValues={post} />
      </Modal>
      <Modal
        modalId={`post-${post.post_id}-info`}
        className="max-w-2xl"
        title="Post information"
      >
        <PostDetail post={post} data={data} />
      </Modal>
    </DropdownMenu >
  )
}
