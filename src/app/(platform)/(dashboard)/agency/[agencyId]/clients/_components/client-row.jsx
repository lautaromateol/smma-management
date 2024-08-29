import { TableCell, TableRow } from "@/components/ui/table"

export function ClientRow({ client }) {
  return (
    <TableRow className="hover:bg-main-shade">
      <TableCell>
        {client.name}
      </TableCell>
      <TableCell>
        {client.email}
      </TableCell>
      <TableCell>
        {client.phoneNumber}
      </TableCell>
      <TableCell>
        {client.companyName}
      </TableCell>
      <TableCell>
        {client.industry}
      </TableCell>
      <TableCell>
        {client.website}
      </TableCell>
    </TableRow>
  )
}
