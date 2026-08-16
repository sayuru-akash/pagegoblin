import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function NotFound() {
  return (
    <>
    <SiteHeader />
    <main className="flex min-h-[75vh] flex-col items-center justify-center bg-grain px-6 py-16 text-center">
      <Image src="/images/home/goblin-curious.png" alt="PageGoblin searching for the missing page" width={180} height={180} className="mb-8 h-40 w-40 object-contain drop-shadow-[0_0_30px_rgba(180,213,43,0.15)]" />
      <h1 className="mb-4 font-display text-5xl uppercase leading-none tracking-tight text-ink sm:text-7xl">
        I sniffed. This page is gone.
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted">
        I dug under every root and bit every loose link. Nothing. This page
        either ran away or was never here.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-[0.3rem] bg-goblin px-6 py-3 text-sm font-bold text-[#111605] shadow-goblin transition-all hover:bg-goblin-dark hover:shadow-glow active:scale-[0.98]"
        >
          Crawl back home
        </Link>
        <Link
          href="/analyze"
          className="rounded-[0.3rem] border border-border px-6 py-3 text-sm font-bold text-ink transition-all hover:border-goblin active:scale-[0.98]"
        >
          Roast a page instead
        </Link>
      </div>
    </main>
    <SiteFooter />
    </>
  );
}
