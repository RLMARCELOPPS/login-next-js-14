import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CustomThemeProvider } from "@/themes/CustomThemeProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Redemple Website",
  description: "Hello Wolrd!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CustomThemeProvider>
        <body className={montserrat.className}>{children}</body>
      </CustomThemeProvider>
    </html>
  );
}
