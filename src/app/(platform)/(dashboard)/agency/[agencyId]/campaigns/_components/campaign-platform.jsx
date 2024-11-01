import { cloneElement } from "react"
import { FaLinkedin, FaMeta, FaX } from "react-icons/fa6"

const platforms = [
  {
    name: "META",
    icon: <FaMeta />
  },
  {
    name: "LINKEDIN",
    icon: <FaLinkedin />
  },
  {
    name: "TWITTER",
    icon: <FaX />
  }
]

export function CampaignPlatform({ platform: userPlatform }) {

  const selectedPlatform = platforms.find((platform) => platform.name === userPlatform)

  // const selectedPlatforms = showAll ? platforms.filter((p) => userPlatforms?.includes(p.name)) : platforms.filter((p) => userPlatforms?.includes(p.name)).slice(0, 2)
  // const rest = platforms.filter((p) => userPlatforms?.includes(p.name)).slice(2).length

  return (
    <div>
      {cloneElement(selectedPlatform.icon, { className: `size-6 text-main-tint` })}
    </div>
  )
}
