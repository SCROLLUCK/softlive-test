import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}
export function DeleteDialog({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: Props) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4"></div>
        <DialogFooter>
          <DialogClose asChild onClick={onCancel}>
            <Button variant="outline">{t("app.btn.cancel")}</Button>
          </DialogClose>
          <Button
            variant="destructive"
            type="button"
            onClick={onConfirm}
            className="hover:cursor-pointer"
          >
            {t("app.btn.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
