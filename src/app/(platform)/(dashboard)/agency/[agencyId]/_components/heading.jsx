export function Heading({ title, subtitle }) {
  return (
    <div className="flex flex-col md:gap-y-1">
      <h2 className="text-center md:text-left text-2xl md:text-3xl text-main-tint font-semibold">{title}</h2>
      <p className="text-center md:text-left text-sm md:text-base font-light text-main">{subtitle}</p>
    </div>
  )
}
