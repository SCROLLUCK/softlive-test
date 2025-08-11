import { useTable } from "@/hooks/useTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "./ui/select";
import { useTranslation } from "react-i18next";
import { Combobox } from "./combo-box";

interface Props {
  total: any;
}
export default function CustomPagination({ total }: Props) {
  const { t } = useTranslation();
  const { setCurrentPage, setPageSize, pageSize, currentPage } = useTable();
  const pages = [...Array(Math.ceil(total / pageSize)).keys()].map(
    (value) => value + 1
  );
  return (
    <div className="flex items-center justify-end gap-2">
      <Pagination className="flex justify-end gap-2">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(currentPage - 1)}
              />
            </PaginationItem>
          )}

          <Combobox
            width="w-[100px]"
            innerWidth="w-[150px]"
            options={pages.map((value) => ({
              value: String(value + 1),
              label: String(value + 1),
            }))}
            placeholder={t("app.common.page")}
            value={String(currentPage)}
            onValueChange={(value) => setCurrentPage(Number(value))}
          />

          {pages.includes(currentPage + 1) && (
            <PaginationItem>
              <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      <Select
        onValueChange={(value: any) => {
          setCurrentPage(1);
          setPageSize(Number(value));
        }}
        value={String(pageSize)}
      >
        <SelectTrigger className="w-fit">
          <SelectValue placeholder={t("app.common.pageSize")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t("app.common.pageSize")}</SelectLabel>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
