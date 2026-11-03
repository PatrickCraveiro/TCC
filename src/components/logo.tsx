import Link from "next/link";
import { HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  claro = false,
  className,
}: {
  href?: string;
  claro?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("flex items-center gap-2.5 font-semibold", className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <HeartPulse className="size-4.5" />
      </span>
      <span className={cn("text-[0.95rem] tracking-[0.12em]", claro ? "text-paper" : "text-foreground")}>
        MEDQUERY
      </span>
    </Link>
  );
}
