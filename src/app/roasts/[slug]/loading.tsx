import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CaveLoader } from "@/components/feedback/cave-loader";

export default function RoastLoading() {
  return (
    <>
      <SiteHeader />
      <main>
        <CaveLoader
          title="I found it. Now I’m dragging it home."
          detail="The page is kicking. I’m biting harder. Your roast is nearly out of the cave."
          showTracks
        />
      </main>
      <SiteFooter />
    </>
  );
}
