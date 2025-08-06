import { toast } from "sonner";
import { t } from "i18next";

export function handleCoreStatus(
  action: string,
  loading: boolean,
  error: any | null,
  prev: any,
  providerName: string
) {
  let formattedErrors = null;
  const commonFields = ["id", "token", "name", "description"];
  if (error) {
    if (error.response?.data && error.response.data.errors) {
      // handle axios errors
      formattedErrors = error.response.data.errors.map(
        (e: any) =>
          `${t(
            `app.${
              commonFields.includes(e.field) ? "error.field" : providerName
            }.${e.field}`
          )}: ${t(`app.error.${e.code}`)} ${e.value ? `(${e.value})` : ""}`
      );
      toast.error(t(`app.error.title`), {
        description: formattedErrors.join("\n"),
        position: "top-right",
        duration: 5000,
      });
    } else {
      formattedErrors = [`${t(`app.error.common`)}`];
      console.log(error);
      toast.error(t(`app.error.title`), {
        description: JSON.stringify(error),
        position: "top-right",
        duration: 5000,
      });
    }
  }
  return {
    ...prev,
    [action]: {
      loading,
      errors: formattedErrors,
    },
  };
}
