"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  label: string;
};
export function SubmitButton({ label }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {label}
    </Button>
  );
}
