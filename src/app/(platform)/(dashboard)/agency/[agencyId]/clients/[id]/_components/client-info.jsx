export function ClientInfo({ client }) {
  return (
    <div className="sm:grid grid-cols-2 md:flex items-center gap-x-6">
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-light">Phone:</p>
        <p className="text-sm">{client.phone}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-light">Company:</p>
        <p className="text-sm">{client.company}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-light">Industry:</p>
        <p className="text-sm">{client.industry}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-light">Website:</p>
        <a target="_blank" href={client.website} className="text-sm hover:underline">{client.website}</a>
      </div>
    </div>
  )
}
