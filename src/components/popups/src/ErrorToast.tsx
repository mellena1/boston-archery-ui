import { type PropsWithChildren } from "react";

import { Toast } from "flowbite-react";
import { HiMinusCircle } from "react-icons/hi";

export type ErrorToastProps = {
  onDismiss?: () => void;
} & PropsWithChildren;

export function ErrorToast(props: ErrorToastProps) {
  return (
    <Toast className="max-w-full">
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <HiMinusCircle className="h-5 w-5" />
      </div>
      <div className="pl-4">{props.children}</div>
      <Toast.Toggle onDismiss={props.onDismiss} />
    </Toast>
  );
}
