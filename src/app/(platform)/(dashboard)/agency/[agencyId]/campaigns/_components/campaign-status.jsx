const statusObj = [
  {
    name: "ACTIVE",
    fill: "#69db7c",
  },
  {
    name: "PAUSED",
    fill: "#ffd43b",
  },
  {
    name: "COMPLETED",
    fill: "#1971c2",
  }
]

export function CampaignStatus({ status }) {

  const selectedStatus = statusObj.find((s) => s.name === status)

  const className = `bg-[${selectedStatus.fill}]`

  return (
    <div
      className={`w-auto p-2 text-sm text-white ${className}`}>
      {selectedStatus.name}
    </div>
  )
}
