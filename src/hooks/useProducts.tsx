import { toast } from "sonner";
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from "react";

import { api } from "../services/api";

import { useNavigate } from "react-router-dom";
import type { Status } from "@/utils/interfaces";
import { handleCoreStatus } from "@/utils";
import { useTable } from "./useTable";
import type { Category } from "./useCategories";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId?: string | null;
  category?: Category[];
}

interface ProductContextData {
  products: { data: Product[]; total: number };
  status: Status;
  currentProduct: Product | null;
  load: () => Promise<void>;
  register: (newProduct: Omit<Partial<Product>, "id">) => Promise<void>;
  update: (Product: Partial<Product> & { categoryId: string }) => Promise<void>;
  _delete: (product: Product) => Promise<void>;
  loadProduct: (id: string) => Promise<void>;
  setCurrentProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

interface ProductProviderProps {
  children: React.ReactNode;
}

interface ProductStatus extends Status {
  loadProduct: { loading: boolean; errors: any };
}

const initStatus = {
  load: { loading: false, errors: null },
  delete: { loading: false, errors: null },
  loadProduct: { loading: false, errors: null },
  update: { loading: false, errors: null },
  register: { loading: false, errors: null },
};

const ProductContext = createContext<ProductContextData | null>(null);

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<{
    total: number;
    data: Product[];
  }>({ total: 0, data: [] });
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const { currentPage, pageSize } = useTable();

  const [status, setStatus] = useState<ProductStatus>(initStatus);
  const handleStatus = useCallback(
    (action: keyof ProductStatus, loading: boolean, error: any | null) => {
      setStatus((prev) =>
        handleCoreStatus(action, loading, error, prev, "Product")
      );
    },
    []
  );

  const load = useCallback(async () => {
    try {
      handleStatus("load", true, null);
      const response = await api.get("/products", {
        // params: {
        //   pageSize,
        //   currentPage,
        // },
      });
      setProducts(response.data); //response.data);
      handleStatus("load", false, null);
    } catch (err: any) {
      handleStatus("load", false, err);
    }
  }, [currentPage, handleStatus, pageSize]);

  const loadProduct = useCallback(
    async (id: string) => {
      try {
        handleStatus("loadProduct", true, null);
        const response = await api.get(`/products/${id}`);
        setCurrentProduct(response.data);
        handleStatus("loadProduct", false, null);
      } catch (err: any) {
        handleStatus("loadProduct", false, err);
      }
    },
    [handleStatus]
  );

  const register = useCallback(
    async (newProduct: Omit<Partial<Product>, "id">) => {
      try {
        handleStatus("register", true, null);
        await api.post("/products", newProduct);
        toast.success("Produto cadastrado com sucesso", {
          position: "top-right",
          duration: 5000,
        });
        handleStatus("register", false, null);
        navigate("/products");
      } catch (err: any) {
        handleStatus("register", false, err);
      }
    },
    [handleStatus, navigate]
  );

  const update = useCallback(
    async (product: Partial<Product> & { categoryId: string }) => {
      try {
        handleStatus("update", true, null);
        await api.put(`/products/${product.id}`, product);
        toast.success("Produto atualizado com sucesso", {
          position: "top-right",
          duration: 5000,
        });
        handleStatus("update", false, null);
        navigate("/products");
      } catch (err: any) {
        handleStatus("update", false, err);
      }
    },
    [handleStatus, navigate]
  );

  const _delete = useCallback(
    async (product: Product) => {
      try {
        handleStatus("delete", true, null);
        await api.delete(
          `/categories/${product.categoryId}/products/${product.id}`
        );
        toast.success("Produto excluído com sucesso", {
          position: "top-right",
          duration: 5000,
        });
        handleStatus("delete", false, null);
        load();
      } catch (err: any) {
        handleStatus("delete", false, err);
      }
    },
    [handleStatus, load]
  );

  const ProductContextData = useMemo(() => {
    return {
      load,
      register,
      update,
      loadProduct,
      _delete,
      status,
      products,
      currentProduct,
      setCurrentProduct,
    };
  }, [
    load,
    register,
    update,
    loadProduct,
    _delete,
    status,
    products,
    currentProduct,
  ]);

  return (
    <ProductContext.Provider value={ProductContextData}>
      {children}
    </ProductContext.Provider>
  );
};

function useProducts(): ProductContextData {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within an ProductProvider");
  }

  return context;
}

export { ProductProvider, useProducts };
