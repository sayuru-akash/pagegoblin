export default function GlobalLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full bg-goblin/20" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-goblin text-3xl">
            🧌
          </div>
        </div>
        <p className="text-sm font-medium text-muted animate-pulse">
          The goblin is sharpening its knives...
        </p>
      </div>
    </div>
  );
}
