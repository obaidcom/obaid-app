"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants=cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[.98]",{variants:{variant:{default:"bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg shadow-blue-500/15 hover:brightness-105",secondary:"bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-85",outline:"border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]",ghost:"text-[var(--foreground)] hover:bg-[var(--muted)]",destructive:"bg-rose-600 text-white hover:bg-rose-700",link:"text-[var(--primary)] underline-offset-4 hover:underline"},size:{default:"h-11 px-5",sm:"h-9 rounded-lg px-3 text-xs",lg:"h-12 px-6 text-base",icon:"size-11 p-0"}},defaultVariants:{variant:"default",size:"default"}});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants>{asChild?:boolean}
export const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(({className,variant,size,asChild=false,...props},ref)=>{const Comp=asChild?Slot:"button";return <Comp ref={ref} className={cn(buttonVariants({variant,size,className}))} {...props}/>;});
Button.displayName="Button";
export { buttonVariants };
