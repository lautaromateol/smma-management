"use client"
import { Modal } from "@/components/modal";
import { useOpenModal } from "@/hooks/use-open-modal";
import { EditInstagramProfileForm } from ".";

export function EditInstagramProfile({ data }) {

  const { onOpen } = useOpenModal((state) => state)

  return (
    <>
      <div
        onClick={() => onOpen("edit-instagram-profile")}
        role="button"
        className="text-sm text-main hover:underline"
      >
        Instagram Profile
      </div>
      <Modal
        className="max-w-2xl"
        modalId="edit-instagram-profile"
        title="Instagram profile"
        description="Review your Instagram business account data. Updating is not available yet."
      >
        <EditInstagramProfileForm data={data} />
      </Modal>
    </>
  )
}
