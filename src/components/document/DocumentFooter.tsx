import { BRAND } from "@/lib/brand";

function Dot({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-[5mm] shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
      {children}
    </span>
  );
}

export function DocumentFooter() {
  return (
    <div className="relative">
      <div className="flex px-[10mm]">
        <div className="h-[0.6mm] w-[38mm] bg-brand" />
        <div className="h-[0.6mm] flex-1 bg-doc-dark" />
      </div>

      <div className="flex items-center justify-between gap-[4mm] px-[14mm] pt-[3mm]">
        <div className="flex max-w-[70mm] items-center gap-[2.5mm]">
          <Dot>
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-[3mm]">
              <path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
            </svg>
          </Dot>
          <span className="text-[2.6mm] leading-[1.5] text-doc-ink">{BRAND.address}</span>
        </div>
      </div>

      <div className="flex items-center gap-[5mm] px-[14mm] pb-[6mm] pt-[2mm]">
        <div className="flex flex-1 items-center justify-between gap-[3mm]">
          <div className="flex items-center gap-[2mm]">
            <Dot>
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-[3mm]">
                <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.6a1 1 0 01-.25 1z" />
              </svg>
            </Dot>
            <span className="text-[2.6mm] text-doc-ink">{BRAND.phone}</span>
          </div>
          <div className="flex items-center gap-[2mm]">
            <Dot>
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-[3mm]">
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5z" />
              </svg>
            </Dot>
            <span className="text-[2.6mm] text-doc-ink">{BRAND.footerEmail}</span>
          </div>
          <div className="flex items-center gap-[2mm]">
            <Dot>
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-[3mm]">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.9 6h-2.5a15 15 0 00-1.4-3.6A8 8 0 0118.9 8zM12 4c.7 1 1.3 2.4 1.7 4h-3.4C10.7 6.4 11.3 5 12 4zM4.3 14a8 8 0 010-4h2.9a17 17 0 000 4zm.8 2h2.5c.3 1.3.8 2.5 1.4 3.6A8 8 0 015.1 16zm2.5-8H5.1a8 8 0 013.9-3.6C8.4 5.5 7.9 6.7 7.6 8zM12 20c-.7-1-1.3-2.4-1.7-4h3.4c-.4 1.6-1 3-1.7 4zm2.1-6H9.9a15 15 0 010-4h4.2a15 15 0 010 4zm.4 5.6c.6-1.1 1.1-2.3 1.4-3.6h2.5a8 8 0 01-3.9 3.6zM16.8 14a17 17 0 000-4h2.9a8 8 0 010 4z" />
              </svg>
            </Dot>
            <span className="text-[2.6mm] text-doc-ink">{BRAND.footerWebsite}</span>
          </div>
        </div>
      </div>

      {/* decorative corner */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-[22mm] w-[34mm] overflow-hidden">
        <div
          className="absolute -bottom-[11mm] -right-[13mm] size-[28mm] rotate-45 bg-brand"
          aria-hidden
        />
        <div
          className="absolute -bottom-[14mm] -right-[14mm] size-[28mm] rotate-45 bg-doc-dark"
          aria-hidden
        />
      </div>
    </div>
  );
}
