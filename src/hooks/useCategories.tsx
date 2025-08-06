import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from "react";

import { api } from "../services/api";

import type { Status } from "@/utils/interfaces";
import { handleCoreStatus } from "@/utils";
import { useTable } from "./useTable";

export interface Category {
  id: string;
  name: string;
}

interface CategoryContextData {
  categories: { data: Category[]; total: number };
  status: Status;
  currentCategory: Category | null;
  load: () => Promise<void>;
}

interface CategoryProviderProps {
  children: React.ReactNode;
}

interface CategoryStatus extends Status {
  loadCategory: { loading: boolean; errors: any };
}

const initStatus = {
  load: { loading: false, errors: null },
  delete: { loading: false, errors: null },
  loadCategory: { loading: false, errors: null },
  update: { loading: false, errors: null },
  register: { loading: false, errors: null },
};

const CategoryContext = createContext<CategoryContextData | null>(null);

const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<{
    total: number;
    data: Category[];
  }>({ total: 0, data: [] });
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const { currentPage, pageSize } = useTable();

  const [status, setStatus] = useState<CategoryStatus>(initStatus);
  const handleStatus = useCallback(
    (action: keyof CategoryStatus, loading: boolean, error: any | null) => {
      setStatus((prev) =>
        handleCoreStatus(action, loading, error, prev, "category")
      );
    },
    []
  );

  const load = useCallback(async () => {
    try {
      handleStatus("load", true, null);
      const response = await api.get("/categories", {
        params: {
          // pageSize,
          // currentPage,
        },
      });
      setCategories(response.data);
      handleStatus("load", false, null);
    } catch (err: any) {
      handleStatus("load", false, err);
    }
  }, [currentPage, handleStatus, pageSize]);

  const CategoryContextData = useMemo(() => {
    return {
      load,
      status,
      categories,
      currentCategory,
      setCurrentCategory,
    };
  }, [load, status, categories, currentCategory]);

  return (
    <CategoryContext.Provider value={CategoryContextData}>
      {children}
    </CategoryContext.Provider>
  );
};

function useCategories(): CategoryContextData {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategories must be used within an CategoryProvider");
  }

  return context;
}

export { CategoryProvider, useCategories };
