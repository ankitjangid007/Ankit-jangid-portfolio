"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

/**
 * @typedef {import("react").PropsWithChildren<import("react").ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>} LabelProps
 */
/**
 * @type {import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<LabelProps> & import("react").RefAttributes<HTMLElement>>}
 */
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
