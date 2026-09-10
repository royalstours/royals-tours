import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Royals Tours",
  description:
    "Privacy Policy and data protection standards of Royals Tours Ahmedabad.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
