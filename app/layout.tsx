import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "PrepWise",
  description: "An AI Powered Platform to Preapre Fpr Mock Interviews",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUserAuthenticated=await isAuthenticated()
  if (!isUserAuthenticated) redirect("/sign-in");
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className}  antialiased pattern`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
