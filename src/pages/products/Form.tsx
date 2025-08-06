/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form as FormUI,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/useCategories";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { Combobox } from "@/components/combo-box";
import { useProducts } from "@/hooks/useProducts";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  edit?: boolean;
}

export default function Form({ edit }: Props) {
  const { register, update, currentProduct, status, loadProduct } =
    useProducts();
  const {
    categories,
    load: loadCategories,
    status: categoryStatus,
  } = useCategories();
  const { t } = useTranslation();

  const FormSchema = z.object({
    name: z.string().min(1, {
      message: t("app.form.required"),
    }),

    price: z
      .preprocess((val) => {
        const numberVal = Number(val);
        return isNaN(numberVal) ? undefined : numberVal;
      }, z.number())
      .refine((v) => v !== undefined && v >= 0, {
        message: t("app.form.invalidPrice"),
      }),
    categoryId: z.string().min(1, {
      message: t("app.form.required"),
    }),
    description: z.string(),
  });

  const params = useParams();
  const { id } = params;

  const form = useForm<z.infer<typeof FormSchema>>({
    // @ts-ignore
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      price: "" as any,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (edit) {
        await update({
          ...data,
          price: Number(data.price),
          id: currentProduct!.id,
        });
      } else {
        await register(data as any);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (id && edit) {
      loadProduct(id);
    }
  }, [edit, id, loadProduct]);

  useEffect(() => {
    if (edit && currentProduct && categories) {
      form.reset({
        name: currentProduct.name,
        price: currentProduct.price,
        description: currentProduct.description,
        categoryId: currentProduct.categoryId as any,
      });
    }
  }, [categories, currentProduct, edit, form]);

  const currentStatus = useMemo(() => {
    return edit ? status.update : status.register;
  }, [status, edit]);

  return (
    <div className="grid xl:w-[70%] md:w-[100%] sx:w-full items-center gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">
              {t("app.product.products")}
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink href="#">
              {edit
                ? t("app.product.editProduct")
                : t("app.product.registerProduct")}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold text-flex">
        {edit ? t("app.product.editProduct") : t("app.product.registerProduct")}
      </h1>
      <FormUI {...form}>
        <form
          // @ts-ignore
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div className="grid grid-cols-3 gap-6">
            <FormField
              // @ts-ignore
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("app.common.name")}</FormLabel>
                  <FormControl>
                    <Input
                      required
                      disabled={currentStatus.loading}
                      placeholder={t("app.form.placeholder.nameProduct")}
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              // @ts-ignore
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("app.product.category")}</FormLabel>
                  <Combobox
                    options={categories.data.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                    loading={categoryStatus.load.loading}
                    width="w-full"
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder={t("app.form.placeholder.selectCategory")}
                    disabled={
                      currentStatus.loading || categoryStatus.load.loading
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              // @ts-ignore
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("app.product.price")}</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="number"
                      value={field.value as any}
                      disabled={currentStatus.loading}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (isNaN(Number(value))) return;
                        field.onChange(value);
                      }}
                      placeholder={t("app.form.placeholder.priceProduct")}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            // @ts-ignore
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("app.common.description")}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={currentStatus.loading}
                    placeholder={t("app.form.placeholder.descriptionProduct")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="flex flex-end"
            disabled={currentStatus.loading}
          >
            {currentStatus.loading && <Loader2 className="mr-2 animate-spin" />}
            {edit ? t("app.btn.save") : t("app.btn.register")}
          </Button>
        </form>
      </FormUI>
    </div>
  );
}
