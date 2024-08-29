"use client"

import { useOrganizationList } from "@clerk/nextjs"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export function OrgControl() {

  const { setActive } = useOrganizationList()
  const params = useParams()

  useEffect(() => {
    if(!setActive) return

    setActive({
      organization: params.agencyId
    })
  }, [params.agencyId, setActive])

  return null
}
