import Image from "next/image";
import { cn } from "@/lib/utils";

export function NiLogo({
  compact = false,
  large = false,
}: {
  compact?: boolean;
  bare?: boolean;
  large?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className={cn("flex items-center justify-center overflow-hidden", large ? "h-16 w-20" : "h-10 w-12")}>
        <Image
          src="/ni-logo-neg.png"
          alt="New Ingenia"
          width={large ? 80 : 44}
          height={large ? 52 : 28}
          className="h-full w-full object-contain"
          priority
        />
      </div>
      {!compact ? (
        <div>
          <p className="text-sm font-semibold tracking-tight text-foreground">NI · Workspace IA</p>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">New Ingenia SA</p>
        </div>
      ) : null}
    </div>
  );
}
