import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
const cairo = Cairo({ subsets:["arabic","latin"], variable:"--font-cairo", display:"swap" });
export const metadata: Metadata = {
 title:"متجر عبيد | تسوّق بتجربة استثنائية",
 description:"اكتشف أحدث الإلكترونيات والصوتيات ومنتجات المنزل والموضة في متجر عبيد.",
 applicationName:"متجر عبيد",
};
export const viewport: Viewport = { themeColor:"#101827", width:"device-width", initialScale:1 };
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="ar" dir="rtl" suppressHydrationWarning><body className={cairo.className}><ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>{children}</ThemeProvider></body></html>;
}
