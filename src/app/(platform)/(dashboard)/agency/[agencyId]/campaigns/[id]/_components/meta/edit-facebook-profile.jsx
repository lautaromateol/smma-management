"use client"
import { Modal } from "@/components/modal";
import { useOpenModal } from "@/hooks/use-open-modal";
import { EditFacebookProfileForm } from ".";
import { useQuery } from "@tanstack/react-query";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { fetcher } from "@/lib/fetcher";

export function EditFacebookProfile({ data }) {

  const { fbPageId, userAccessToken } = data

  const { onOpen } = useOpenModal((state) => state)

  const { data: page, isPending } = useQuery({
    queryKey: ["facebook-page-data", fbPageId],
    queryFn: () => fetcher(`${FACEBOOK_API_GRAPH_URL}/${fbPageId}?fields=about,description,instagram_business_account,picture,cover,category,phone,emails,location,website&access_token=${userAccessToken}`)
  })

  return (
    <>
      <div
        onClick={() => onOpen("edit-facebook-profile")}
        role="button"
        className="text-sm text-main hover:underline"
      >
        Edit Facebook Profile
      </div>
      <Modal
        className="max-w-2xl"
        modalId="edit-facebook-profile"
        title="Edit Facebook profile"
        description="Update your Facebook data"
      >
        {
          isPending ?
            <EditFacebookProfileForm.Skeleton />
            :
            <EditFacebookProfileForm page={page} data={data} />
        }
      </Modal>
    </>
  )
}
