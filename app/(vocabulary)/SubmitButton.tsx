"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant={"secondary"}
      {...props}
      disabled={props.disabled || pending}
    />
  );
};
