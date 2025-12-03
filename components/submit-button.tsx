"use client";

import { Button } from "@/components/ui/buttons/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
    pendingText?: string;
    type?: "submit" | "button" | "reset";
};

export function SubmitButton({ children, pendingText = "Submitting...", ...props }: Props) {
    const { pending } = useFormStatus();

    return (
        <Button type={props.type || "submit"} aria-disabled={pending} {...props}>
            {pending ? pendingText : children}
        </Button>
    );
}
