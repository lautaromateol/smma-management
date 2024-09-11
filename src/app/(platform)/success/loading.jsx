export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-main-light">
      <div className="flex flex-col items-center gap-y-2">
        <div className="h-16 w-16 animate-spin rounded-full border-2 border-solid border-main-tint border-t-transparent" />
        <p className="text-main-tint font-medium text-base">Linking account...</p>
      </div>
    </div>
  )
}
