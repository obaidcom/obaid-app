import * as React from "react";
import { cn } from "@/lib/utils";
export const Input=React.forwardRef<HTMLInputElement,React.ComponentProps<"input">>(({className,type,...props},ref)=><input type={type} className={cn("flex h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50",className)} ref={ref} {...props}/>);
Input.displayName="Input";
