export default function AnalyzeLoading() {
  return (
    <div className="flex flex-1 flex-col items-center bg-grain">
      <div className="mx-auto w-full max-w-2xl px-6 pt-24 pb-16">
        <div className="mx-auto mb-8 h-28 w-28 animate-pulse rounded-full bg-bone" />
        <div className="mx-auto h-10 w-72 animate-pulse rounded-lg bg-bone" />
        <div className="mx-auto mt-4 h-5 w-80 animate-pulse rounded-lg bg-bone" />
        <div className="mx-auto mt-10 h-48 w-full animate-pulse rounded-2xl border border-border bg-bone/50" />
      </div>
    </div>
  );
}
