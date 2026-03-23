import { IUser } from "@/features/auth/schemas/user.schema";
import { EmptyTableRow } from "@/components/shared/table/empty-table-row";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { translateEnum } from "@/lib/translate";
import { ReporterManagementRootAction } from "./reporter-management-action";

interface IReporterListManagementTableProps {
  reporters: IUser[];
}

export function ReporterListManagementTable({
  reporters,
}: IReporterListManagementTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-end">ลำดับ</TableHead>
          <TableHead>ชื่อ</TableHead>
          <TableHead>เบอร์โทร</TableHead>
          <TableHead>อีเมล์</TableHead>
          <TableHead className="text-center">สถานะ</TableHead>
          <TableHead className="text-end">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reporters.length > 0 ? (
          reporters.map((reporter, index) => (
            <TableRow key={reporter.id}>
              <TableCell className="text-end">{index + 1}</TableCell>
              <TableCell>{reporter.fullName}</TableCell>
              <TableCell>{reporter.phone}</TableCell>
              <TableCell>{reporter.email}</TableCell>
              <TableCell className="text-center">
                {translateEnum.userActiveStatus(reporter)}
              </TableCell>
              <TableCell className="text-end">
                <ReporterManagementRootAction reporter={reporter} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <EmptyTableRow />
        )}
      </TableBody>
    </Table>
  );
}
