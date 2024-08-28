import { OrganizationList } from "@clerk/nextjs";

export default function CreateAgencyPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/agency/:id"
      afterCreateOrganizationUrl="/agency/:id"
    />
  )
}
