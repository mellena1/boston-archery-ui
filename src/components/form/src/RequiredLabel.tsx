import { Label, type LabelProps } from "flowbite-react";

export function RequiredLabel(props: LabelProps) {
  return (
    <>
      <Label {...props} />
      <span className="text-red-500 pl-1">*</span>
    </>
  );
}
