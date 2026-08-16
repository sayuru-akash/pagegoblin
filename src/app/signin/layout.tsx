import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Your Roast Stash",
  description: "Sign in to PageGoblin and get back to the website roasts saved in your cave.",
  alternates: { canonical: "/signin" },
  robots: { index: false, follow: false },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
