"use client"
import { Modal } from "@/components/modal";
import { useOpenModal } from "@/hooks/use-open-modal";
import { EditFacebookProfileForm } from ".";

export function EditFacebookProfile({ data }) {

  const { onOpen } = useOpenModal((state) => state)

  return (
    <>
      <div
        onClick={() => onOpen("edit-facebook-profile")}
        role="button"
        className="text-sm text-main hover:underline"
      >
        Facebook Profile
      </div>
      <Modal
        className="max-w-2xl"
        modalId="edit-facebook-profile"
        title="Edit Facebook profile"
        description="Update your Facebook data"
      >
        <EditFacebookProfileForm data={data} />
      </Modal>
    </>
  )
}
