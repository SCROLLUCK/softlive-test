import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface TableProviderProps {
  children: ReactNode;
}

interface TableContextData {
  pageSize: number;
  currentPage: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  resetParams: () => void;
}

const TableContext = createContext<TableContextData | null>(null);

function TableProvider({ children }: TableProviderProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const resetParams = useCallback(() => {
    setSearch("");
    setCurrentPage(1);
    setPageSize(10);
  }, []);

  const TableProviderData: TableContextData = useMemo(
    () => ({
      search,
      pageSize,
      currentPage,
      setCurrentPage,
      setSearch,
      setPageSize,
      resetParams,
    }),
    [currentPage, pageSize, resetParams, search]
  );

  return (
    <TableContext.Provider value={TableProviderData}>
      {children}
    </TableContext.Provider>
  );
}

function useTable() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within an TableProvider");
  }

  return context;
}

export { TableProvider, useTable };
