import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CustomPagination from "@/components/custom-pagination";
import { DeleteDialog } from "@/components/delete-dialog";
import SkeletonTableRow from "@/components/skeleton-table-row";
import { useCategories } from "@/hooks/useCategories";

export default function Table() {
  const navigate = useNavigate();
  const {
    products,
    load: loadProducts,
    status,
    currentProduct,
    setCurrentProduct,
    _delete,
  } = useProducts();
  const { categories, load: loadCategories } = useCategories();
  const { t } = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    Promise.all([loadProducts(), loadCategories()]);
  }, [loadCategories, loadProducts]);

  return (
    <Card>
      {currentProduct && (
        <DeleteDialog
          open={deleteDialogOpen && !!currentProduct}
          title={t("app.product.deleteProduct")}
          description={t("app.product.deleteProductDescription")
            .toString()
            .replace("<PRODUCT>", currentProduct?.name || "")}
          onCancel={() => setDeleteDialogOpen(false)}
          onConfirm={async () => {
            await _delete(currentProduct);
            setDeleteDialogOpen(false);
            setCurrentProduct(null);
          }}
        />
      )}
      <CardHeader>
        <div className="flex justify-between" id="card-header">
          <CardTitle>{t("app.product.products")}</CardTitle>
          <Button onClick={() => navigate("/products/new")}>
            {t("app.product.newProduct")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <TableUI>
          <TableHeader>
            <TableRow className="text-lime-100">
              <TableHead>{t("app.common.name")}</TableHead>
              <TableHead>{t("app.product.price")}</TableHead>
              <TableHead>{t("app.product.category")}</TableHead>
              <TableHead>{t("app.common.description")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!status.load.loading &&
              products.data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>$ {product.price}</TableCell>
                  <TableCell>
                    {categories.data.find(
                      (category) => category.id === product.categoryId
                    )?.name || "-"}
                  </TableCell>
                  <TableCell>
                    {product.description === "" ? "-" : product.description}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 hover:bg-gray-200 hover:cursor-pointer"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      <PencilIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 hover:bg-gray-200 hover:cursor-pointer"
                      onClick={() => {
                        setCurrentProduct(product);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 color="red" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {!status.load.loading && products.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {t("app.common.noResults")}
                </TableCell>
              </TableRow>
            )}
            {status.load.loading && (
              <>
                <SkeletonTableRow columns={4} />
                <SkeletonTableRow columns={4} />
                <SkeletonTableRow columns={4} />
              </>
            )}
          </TableBody>
        </TableUI>
        <CustomPagination total={products.total} />
      </CardContent>
    </Card>
  );
}
