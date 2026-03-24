import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IIncidentType } from "../schemas/incident-type.schema";
import { EmptyTableRow } from "@/components/shared/table/empty-table-row";
import { IncidentTypeManagementRootAction } from "./incident-management-action";
import { IncidentTypePriorityBadge } from "./incident-type-priority-badge";

interface IncidentTypeListManagementTableProps {
  incidentTypes: IIncidentType[];
}

export function IncidentTypeListManagementTable({
  incidentTypes,
}: IncidentTypeListManagementTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-end">ลำดับ</TableHead>
          <TableHead>ชื่อ</TableHead>
          <TableHead className="text-center">ลำดับความสำคัญ</TableHead>
          <TableHead className="text-end">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incidentTypes.length > 0 ? (
          incidentTypes.map((incidentType, index) => (
            <TableRow key={incidentType.id}>
              <TableCell className="text-end">{index + 1}</TableCell>
              <TableCell>{incidentType.name}</TableCell>
              <TableCell className="text-center">
                <IncidentTypePriorityBadge incidentType={incidentType} />
              </TableCell>
              <TableCell className="text-end">
                <IncidentTypeManagementRootAction
                  className="flex justify-end gap-2"
                  incidentType={incidentType}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <EmptyTableRow colSpan={4} />
        )}
      </TableBody>
    </Table>
  );
}
