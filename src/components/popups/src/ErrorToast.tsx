import { type PropsWithChildren, useEffect } from "react";

import { toast } from "sonner";

export type ErrorToastProps = {
  onDismiss?: () => void;
} & PropsWithChildren;

export function ErrorToast(props: ErrorToastProps) {
  useEffect(() => {
    toast.error(props.children, {
      onDismiss: props.onDismiss,
    });
  }, [props.children, props.onDismiss]);

  return null;
}
