import Image from "next/image";

export function NiLogo({ compact = false, bare = false }: { compact?: boolean; bare?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`flex h-10 w-12 items-center justify-center overflow-hidden ${bare ? "" : "rounded-sm bg-[#252525] p-1.5"}`}>
        <Image
          src="/ni-logo-neg.png"
          alt="New Ingenia"
          width={44}
          height={28}
          className="h-full w-full object-contain"
          priority
        />
      </div>
      {!compact ? (
        <div>
          <p className="text-sm font-semibold tracking-tight text-[#252525]">NI · Workspace IA</p>
          <p className="text-xs uppercase tracking-[0.18em] text-[#777777]">New Ingenia SA</p>
        </div>
      ) : null}
    </div>
  );
}
