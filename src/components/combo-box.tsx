"use client";

import * as React from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "react-i18next";

interface Props {
  options: { value: string; label: string }[];
  placeholder?: string;
  value: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  width?: string;
  innerWidth?: string;
}

export function Combobox({
  placeholder,
  options,
  value,
  onValueChange,
  disabled = false,
  loading = false,
  width,
  innerWidth,
}: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const setValue = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={`${width ?? ""}`}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`justify-between text-left font-normal`}
          disabled={disabled}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : loading
            ? t("app.common.loading")
            : placeholder}
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ChevronDown className="opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`${
          innerWidth ?? "w-[var(--radix-popover-trigger-width)]"
        } p-0`}
      >
        <Command>
          <CommandInput
            placeholder={loading ? t("app.common.loading") : placeholder}
            className="h-9"
            disabled={disabled}
          />
          <CommandList>
            <CommandEmpty>{t("app.common.noData")}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.label}
                  value={option.label}
                  onSelect={() => {
                    setValue(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
