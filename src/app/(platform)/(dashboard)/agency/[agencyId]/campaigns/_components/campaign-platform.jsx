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

export function CampaignPlatform({ platforms: userPlatforms, showAll }) {

  const selectedPlatforms = showAll ? platforms.filter((p) => userPlatforms?.includes(p.name)) : platforms.filter((p) => userPlatforms?.includes(p.name)).slice(0, 2)
  const rest = platforms.filter((p) => userPlatforms?.includes(p.name)).slice(2).length

  return (
    <div className="flex items-center gap-x-1">
      {selectedPlatforms?.map((platform, i) => (
        <div key={i}>
          {cloneElement(platform.icon, { className: `size-6 text-main-tint` })}
        </div>
      ))}
      {rest > 0 && !showAll ? (
        <p className="border rounded-full px-2 py-1">+{rest}</p>
      ) : ""}
    </div>
  )
}
