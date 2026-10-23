import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants=cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]",{variants:{variant:{default:"bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg shadow-blue-500/15 hover:brightness-105",secondary:"bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-85",outline:"border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]",ghost:"text-[var(--foreground)] hover:bg-[var(--muted)]",destructive:"bg-rose-600 text-white hover:bg-rose-700"},size:{default:"h-11 px-5",sm:"h-9 rounded-lg px-3 text-xs",lg:"h-12 px-6 text-base",icon:"size-11 p-0"}},defaultVariants:{variant:"default",size:"default"}});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants>{}
export const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(({className,variant,size,...props},ref)=><button ref={ref} className={cn(buttonVariants({variant,size,className}))} {...props}/>);
Button.displayName="Button";
