import { Label, type LabelProps } from "@/components/ui/label";

export function RequiredLabel(props: LabelProps) {
  return (
    <div className="flex">
      <Label {...props} />
      <span className="text-red-500 pl-1">*</span>
    </div>
  );
}