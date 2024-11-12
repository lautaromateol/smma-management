"use client"
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useOpenModal } from "@/hooks/use-open-modal";
import { CampaignsForm } from ".";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Megaphone } from "lucide-react";

export function CampaignButtons() {

  const { onOpen } = useOpenModal((state) => state)

  const { data: clients, isPending } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetcher("/api/clients")
  })

  return (
    // <div className="flex items-center gap-x-4">
    <>
      <Button
        className="flex items-center justify-center gap-x-1"
        onClick={() => onOpen("add-campaign-modal")}
        variant="main"
        size="sm"
      >
        Start campaign
        <Megaphone className="size-5 text-white" />
      </Button>
      <Modal
        modalId="add-campaign-modal"
        title="Start a new campaign"
        description="Fill out the form inputs to start a new social media campaign"
      >
        {isPending ?
          <CampaignsForm.Skeleton />
          :
          <CampaignsForm
            clients={clients}
          />
        }
      </Modal>
    </>
    // </div>
  )
}
