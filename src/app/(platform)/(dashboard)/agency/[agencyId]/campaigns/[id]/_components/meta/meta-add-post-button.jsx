"use client"
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useOpenModal } from "@/hooks/use-open-modal";
import { TextSelect } from "lucide-react";
import { MetaAddPostForm } from ".";

export function MetaAddPostButton({ data }) {

  const { onOpen } = useOpenModal((state) => state)

  return (
    <>
      <Button
        onClick={() => onOpen("meta-add-post-form")}
        variant="main"
        className="flex items-center gap-x-2 font-medium col-span-2"
      >
        Create post
        <TextSelect className="size-4" />
      </Button>
      <Modal
        modalId="meta-add-post-form"
        title="Post something on Meta"
        description="Fill the fields and upload something new on Facebook or Instagram"
      > 
      <MetaAddPostForm data={data} />
      </Modal>
    </>
  )
}
