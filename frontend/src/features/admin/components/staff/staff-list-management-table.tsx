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
import { StaffManagementRootAction } from "./staff-management-action";

interface IStaffListManagementTableProps {
  staffs: IUser[];
}

export function StaffListManagementTable({
  staffs,
}: IStaffListManagementTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-end">ลำดับ</TableHead>
          <TableHead>ชื่อ</TableHead>
          <TableHead>เบอร์โทร</TableHead>
          <TableHead>อีเมล์</TableHead>
          <TableHead className="text-center">บทบาท</TableHead>
          <TableHead className="text-center">สถานะ</TableHead>
          <TableHead className="text-end">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staffs.length > 0 ? (
          staffs.map((staff, index) => (
            <TableRow key={staff.id}>
              <TableCell className="text-end">{index + 1}</TableCell>
              <TableCell>{staff.fullName}</TableCell>
              <TableCell>{staff.phone}</TableCell>
              <TableCell>{staff.email}</TableCell>
              <TableCell className="text-center">
                {translateEnum.staffRoleEnum(staff.staffRole!)}
              </TableCell>
              <TableCell className="text-center">
                {translateEnum.userActiveStatus(staff)}
              </TableCell>
              <TableCell className="text-end">
                <StaffManagementRootAction staff={staff} />
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
