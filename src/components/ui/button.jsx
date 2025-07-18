import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Custom glossy effect for default button variant
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl px-8 h-12 text-lg font-semibold font-sans ring-offset-background transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 before:absolute before:inset-0 before:rounded-xl before:pointer-events-none before:opacity-60 before:bg-[linear-gradient(120deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_60%)] before:transition-opacity before:duration-300 hover:before:opacity-90",
        destructive:
          "bg-destructive text-destructive-foreground rounded-xl hover:bg-destructive/90",
        outline:
          "border border-input bg-background rounded-xl hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground rounded-lg",
        link:
          "text-primary underline underline-offset-4 hover:opacity-90 px-0 rounded-none bg-transparent shadow-none",
      },
      size: {
        default: "h-12 px-8 py-2 min-w-[120px]",
        sm: "h-10 px-4 min-w-[84px] text-base rounded-lg",
        lg: "h-14 px-10 text-xl rounded-xl",
        icon: "h-12 w-12 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
