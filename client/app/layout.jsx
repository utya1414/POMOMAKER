import { Inter } from "next/font/google";
import "./globals.css";
import { AppLogo, Footer } from "@/lib/components/layouts";
import { ThemeProvider } from "@/lib/components/providers/ThemeProvider";
import { Toaster } from "@/lib/components/shadcn-ui/Toaster";
import { Separator } from "@/lib/components/shadcn-ui/separator";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          diableTransitionOnChange
        >
          {/* ブラウザのスケールを67%に設定 */}
          <div className="scale-[.67] origin-top-left w-[calc(100%/0.67)] h-[calc(100%/0.67)]">
            <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen ">
              <div className="my-4 text-4xl font-sans flex justify-center items-center">
                <AppLogo />
              </div>
              <Separator />
              <main className="flex w-full flex-grow">{children}</main>
              <Separator />
              <Footer />
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
