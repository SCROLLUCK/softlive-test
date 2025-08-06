import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

interface Props {
  columns: number;
}
export default function SkeletonTableRow({ columns }: Props) {
  return (
    <TableRow>
      {[...Array(columns).keys()].map((index) => (
        <TableCell key={index}>
          <Skeleton className="h-4" />
        </TableCell>
      ))}
    </TableRow>
  );
}
