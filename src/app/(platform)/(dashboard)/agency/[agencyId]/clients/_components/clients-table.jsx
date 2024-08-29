import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClientRow } from "./client-row";

export function ClientsTable({ clients }) {
  return (
    <Table>
      <TableHeader>
        <TableRow> 
          <TableHead>
            Name
          </TableHead>
          <TableHead>
            Email
          </TableHead>
          <TableHead>
            Phone number
          </TableHead>
          <TableHead>
            Company name
          </TableHead>
          <TableHead>
            Industry 
          </TableHead>
          <TableHead>
            Website
          </TableHead>
          <TableHead>
            Details
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-neutral-500">
        {clients.map((client, i) => (
         <ClientRow key={i} client={client} />
        ))}
      </TableBody>
    </Table>
  )
}