import { cn } from "@/utils";
import { ReactNode } from "react";

interface FormControlProps {
	className?: string;
	children: ReactNode;
}

export function FormControl({ className, children }: FormControlProps) {
	return <div className={cn("space-y-1", className)}>{children}</div>;
}
