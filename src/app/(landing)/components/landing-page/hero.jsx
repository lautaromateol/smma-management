export function Hero() {
  return (
    <section className="flex items-center justify-center py-52">
      <div className="w-1/2 flex flex-col gap-y-4">
        <div className="w-1/2 text-center font-semibold text-base mx-auto bg-main-shade text-main-tint px-4 py-2 rounded-md shadow">
          #1&apos;s agency&apos;s management SAAS
        </div>
        <h1 className="pb-2 text-center text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-main to-main-tint">
          Manage your SMMA&apos;s in an efficient way with Adsync
        </h1>
        <p className="text-center text-main-tint">Manage your social media campaigns effortlessly. Track performance, engage with your audience, and grow your clients&apos; brands—all in one place.</p>
      </div>
    </section>
  )
}
