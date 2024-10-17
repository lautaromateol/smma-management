"use client"
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useOpenModal } from "@/hooks/use-open-modal";
import { PlusCircle } from "lucide-react";
import { MetaCreateStoryForm } from ".";

export function MetaCreateStoryButton({ data }) {

  const { onOpen } = useOpenModal((state) => state)

  return (
    <>
      <Button
        onClick={() => onOpen("meta-create-story-form")}
        className="flex items-center font-medium gap-x-2 col-span-2"
        variant="outline"
      >
        Create Story
        <PlusCircle className="size-4" />
      </Button>
      <Modal
        modalId="meta-create-story-form" 
        title="Publish a story on Meta"
        description="Fill out the inputs to publish a new story on Facebook or Instagram"
      >
        <MetaCreateStoryForm data={data} />
      </Modal>
    </>
  )
}
