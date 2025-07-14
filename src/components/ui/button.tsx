import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive";
  size?: "default" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          variant === "outline" && "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          variant === "destructive" && "bg-red-600 text-white hover:bg-red-700",
          size === "icon" ? "h-9 w-9 p-0" : "h-10 px-4 py-2 text-base",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button }; 