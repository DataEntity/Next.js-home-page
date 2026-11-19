import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kirishima - Homepage",
  description: "A personal homepage for writing, reading, and web experiments.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
