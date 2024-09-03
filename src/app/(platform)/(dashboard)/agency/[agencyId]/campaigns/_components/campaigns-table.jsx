import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CampaignRow } from "./campaign-row";

export function CampaignsTable({ campaigns }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Client name
          </TableHead>
          <TableHead>
            Budget
          </TableHead>
          <TableHead>
            Platforms
          </TableHead>
          <TableHead>
            Status
          </TableHead>
          <TableHead>
            Start Date
          </TableHead>
          <TableHead>
            End Date
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <CampaignRow key={campaign.id} campaign={campaign} />
        ))}
      </TableBody>
    </Table>
  )
}
