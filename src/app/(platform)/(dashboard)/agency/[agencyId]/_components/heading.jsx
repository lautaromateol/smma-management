export function Heading({ title, subtitle }) {
  return (
    <div className="flex flex-col space-y-1">
      <h2 className="text-3xl text-main-tint font-semibold">{title}</h2>
      <span className="text-base font-light text-main">{subtitle}</span>
    </div>
  )
}
