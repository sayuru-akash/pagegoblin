import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dig Out Your Own Cave",
  description: "Create a PageGoblin account to keep your website roasts and return to the fixes later.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: false },
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
