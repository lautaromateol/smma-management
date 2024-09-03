import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-x-1 w-auto"
    >
      <div className="relative size-8">
        <Image
          src="/logo.png"
          fill
          className="object-cover"
          alt="Adsync logo"
        />
      </div>
      <p className="text-xl font-bold text-main-tint uppercase">Adsync</p>
    </Link>
  )
}
