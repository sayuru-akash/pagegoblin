import { signOut } from "@/auth";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-transparent px-4 text-sm font-medium text-ink transition-all duration-300 hover:bg-bone focus-goblin"
      >
        Sign out
      </button>
    </form>
  );
}
