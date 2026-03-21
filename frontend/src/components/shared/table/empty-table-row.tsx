import { TableRow, TableCell } from "@/components/ui/table";

interface EmptyTableRowProps {
  colSpan?: number;
  children?: React.ReactNode;
}

export function EmptyTableRow({ colSpan, children }: EmptyTableRowProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan || 20}
        className="text-center text-current/50"
      >
        {children || "ไม่พบข้อมูล"}
      </TableCell>
    </TableRow>
  );
}
